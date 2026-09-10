-- ============================================================
-- CONECTA AGRO — Schema Supabase (Postgres)
-- Cobre RF-01 a RF-13, RF-16, RF-19, RF-21/22, RF-23, RF-29 (MVP)
-- Rode este arquivo inteiro no SQL Editor do seu projeto Supabase.
-- ============================================================

-- Extensões
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- 1. PERFIS DE USUÁRIO (RF-01, RF-02, RF-29)
-- ------------------------------------------------------------
create type user_role as enum ('agricultor', 'tecnico', 'administrador');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role user_role not null default 'agricultor',
  phone text,
  avatar_url text,
  blocked boolean not null default false,
  created_at timestamptz not null default now()
);

-- Cria o perfil automaticamente quando um usuário se cadastra
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'agricultor'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------
-- 2. PROPRIEDADES E TALHÕES (RF-03, RF-04)
-- ------------------------------------------------------------
create table properties (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  city text,
  state text,
  latitude double precision,
  longitude double precision,
  area_hectares numeric,
  main_crop text,
  created_at timestamptz not null default now()
);

create table plots (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  name text not null,
  crop text,
  area_hectares numeric,
  created_at timestamptz not null default now()
);

-- Vincula técnicos/administradores a propriedades que acompanham
create table property_members (
  property_id uuid not null references properties(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role user_role not null default 'agricultor',
  primary key (property_id, user_id)
);

-- ------------------------------------------------------------
-- 3. ESTAÇÕES IOT (RF-05, RF-06, RN-01, RN-05)
-- ------------------------------------------------------------
create type station_status as enum ('online', 'atencao', 'offline');

create table stations (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  plot_id uuid references plots(id) on delete set null,
  code text not null,                 -- ex: "Estação 1"
  latitude double precision,
  longitude double precision,
  status station_status not null default 'offline',
  battery_pct numeric,
  last_seen_at timestamptz,
  offline_threshold_minutes int not null default 60, -- RN-05
  created_at timestamptz not null default now(),
  unique (property_id, code)
);

-- ------------------------------------------------------------
-- 4. LEITURAS DOS SENSORES (RF-07, RF-08, RF-09, RF-10, RF-11, RNF-16)
-- ------------------------------------------------------------
create table sensor_readings (
  id bigint generated always as identity primary key,
  station_id uuid not null references stations(id) on delete cascade,
  recorded_at timestamptz not null default now(),
  soil_moisture_pct numeric,          -- umidade do solo
  air_temperature_c numeric,
  air_humidity_pct numeric,
  atmospheric_pressure_hpa numeric,
  uv_index numeric,
  water_flow_l numeric,               -- vazão/volume (RF-10)
  reservoir_level_pct numeric,        -- RF-11
  battery_pct numeric,                -- RF-12
  created_at timestamptz not null default now()
);

create index idx_sensor_readings_station_time
  on sensor_readings (station_id, recorded_at desc);

-- ------------------------------------------------------------
-- 5. IRRIGAÇÃO (RF-16, RF-19, RF-20, RF-21, RF-22, RN-02, RN-03, RN-10)
-- ------------------------------------------------------------
create type irrigation_mode as enum ('manual', 'automatico');
create type irrigation_status as enum ('em_andamento', 'concluida', 'cancelada');

create table irrigation_settings (
  property_id uuid primary key references properties(id) on delete cascade,
  auto_mode_enabled boolean not null default false,
  default_duration_minutes int not null default 30,
  soil_moisture_target_pct numeric not null default 60,
  updated_at timestamptz not null default now()
);

create table irrigation_events (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  station_id uuid references stations(id) on delete set null,
  mode irrigation_mode not null,
  status irrigation_status not null default 'em_andamento',
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_minutes int,
  water_used_l numeric,
  triggered_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

create table irrigation_recommendations (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  recommended_for date not null default current_date,
  should_irrigate boolean not null,
  estimated_mm numeric,
  reasoning text,                      -- RN-04: dados que fundamentam a decisão
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 6. ALERTAS E NOTIFICAÇÕES (RF-23, RF-24)
-- ------------------------------------------------------------
create type alert_severity as enum ('info', 'atencao', 'critico');

create table alerts (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  station_id uuid references stations(id) on delete set null,
  severity alert_severity not null default 'info',
  title text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 7. EVENTOS/AUDITORIA (RF-32, RNF-12)
-- ------------------------------------------------------------
create table event_log (
  id bigint generated always as identity primary key,
  property_id uuid references properties(id) on delete cascade,
  user_id uuid references profiles(id),
  action text not null,
  details jsonb,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table profiles enable row level security;
alter table properties enable row level security;
alter table plots enable row level security;
alter table property_members enable row level security;
alter table stations enable row level security;
alter table sensor_readings enable row level security;
alter table irrigation_settings enable row level security;
alter table irrigation_events enable row level security;
alter table irrigation_recommendations enable row level security;
alter table alerts enable row level security;
alter table event_log enable row level security;

-- Função auxiliar: usuário tem acesso à propriedade?
create function public.has_property_access(p_property_id uuid)
returns boolean as $$
  select exists (
    select 1 from properties p
    where p.id = p_property_id and p.owner_id = auth.uid()
    union
    select 1 from property_members pm
    where pm.property_id = p_property_id and pm.user_id = auth.uid()
  );
$$ language sql security definer stable;

-- profiles: usuário vê e edita o próprio perfil
create policy "profiles_select_own" on profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);

-- properties: dono e membros têm acesso
create policy "properties_select" on properties for select
  using (owner_id = auth.uid() or has_property_access(id));
create policy "properties_insert" on properties for insert
  with check (owner_id = auth.uid());
create policy "properties_update" on properties for update
  using (owner_id = auth.uid());
create policy "properties_delete" on properties for delete
  using (owner_id = auth.uid());

-- plots
create policy "plots_select" on plots for select
  using (has_property_access(property_id));
create policy "plots_write" on plots for all
  using (has_property_access(property_id)) with check (has_property_access(property_id));

-- property_members
create policy "members_select" on property_members for select
  using (has_property_access(property_id));

-- stations
create policy "stations_select" on stations for select
  using (has_property_access(property_id));
create policy "stations_write" on stations for all
  using (has_property_access(property_id)) with check (has_property_access(property_id));

-- sensor_readings (leitura por quem tem acesso à propriedade da estação)
create policy "readings_select" on sensor_readings for select
  using (exists (
    select 1 from stations s where s.id = station_id and has_property_access(s.property_id)
  ));
-- Inserção feita pelo backend das estações com a service_role key (bypassa RLS)

-- irrigation_settings
create policy "irrigation_settings_all" on irrigation_settings for all
  using (has_property_access(property_id)) with check (has_property_access(property_id));

-- irrigation_events
create policy "irrigation_events_select" on irrigation_events for select
  using (has_property_access(property_id));
create policy "irrigation_events_write" on irrigation_events for insert
  with check (has_property_access(property_id));
create policy "irrigation_events_update" on irrigation_events for update
  using (has_property_access(property_id));

-- irrigation_recommendations
create policy "recommendations_select" on irrigation_recommendations for select
  using (has_property_access(property_id));

-- alerts
create policy "alerts_select" on alerts for select
  using (has_property_access(property_id));
create policy "alerts_update" on alerts for update
  using (has_property_access(property_id));

-- event_log
create policy "event_log_select" on event_log for select
  using (property_id is null or has_property_access(property_id));
create policy "event_log_insert" on event_log for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- DADOS DE EXEMPLO (opcional — rode manualmente após criar seu usuário)
-- Substitua SEU_USER_ID pelo id em auth.users depois do primeiro cadastro.
-- ============================================================
-- insert into properties (owner_id, name, city, state, main_crop)
-- values ('SEU_USER_ID', 'Sítio São José', 'Salgueiro', 'PE', 'Milho');
