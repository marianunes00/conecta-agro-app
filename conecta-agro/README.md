# Conecta Agro — App Web (MVP)

Web app responsivo (mobile-first) do Conecta Agro, construído a partir das 10 telas do
protótipo e do Documento de Requisitos. Stack: **Next.js 14 (App Router) + TypeScript +
Tailwind CSS + Supabase (Auth/Postgres) + Vercel**.

Cobre o escopo de MVP do documento: RF-01 a RF-13, RF-16, RF-19, RF-21/22, RF-23,
RF-25/26 (parcial), RF-29.

> Por que web em vez de Flutter nativo? O requisito RNF-03 pede o app em Flutter, mas
> Vercel publica apps **web**. Este projeto entrega a mesma experiência (responsiva,
> RNF-02) publicável hoje em poucos minutos. Se quiser o app mobile nativo depois, o
> mesmo banco Supabase e a mesma API podem ser reaproveitados no Flutter.

---

## 1. Criar o projeto no Supabase (5 min)

1. Acesse [supabase.com](https://supabase.com) → **New project**.
2. Anote a **Database Password** que você definir.
3. Quando o projeto terminar de provisionar, vá em **SQL Editor** → **New query**.
4. Copie todo o conteúdo do arquivo `supabase/schema.sql` deste projeto, cole e clique
   em **Run**. Isso cria todas as tabelas, os tipos e as políticas de segurança (RLS).
5. Vá em **Project Settings → API** e copie:
   - `Project URL` → vai em `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → vai em `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. (Opcional, mas recomendado) Em **Authentication → Providers → Email**, desative
   "Confirm email" para testar login mais rápido hoje. Reative depois para produção.

## 2. Rodar localmente (opcional, para testar antes do deploy)

```bash
cp .env.local.example .env.local
# edite .env.local com as chaves do Supabase
npm install
npm run dev
```

Abra `http://localhost:3000`, crie sua conta em **Criar uma conta**, e cadastre sua
primeira propriedade quando o painel pedir.

## 3. Publicar no Vercel (5 min)

**Opção A — pelo site (mais simples):**
1. Suba esta pasta para um repositório no GitHub (crie um repo vazio e faça `git init`,
   `git add .`, `git commit -m "conecta agro mvp"`, `git remote add origin ...`,
   `git push`).
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clique em **Deploy**. Em ~2 minutos o app estará no ar em `algo.vercel.app`.

**Opção B — pela CLI:**
```bash
npm i -g vercel
vercel login
vercel --prod
# quando perguntar as env vars, cole a URL e a anon key do Supabase
```

## 4. Testar o fluxo ponta a ponta

1. Abra o link do Vercel → **Criar uma conta**.
2. No painel, cadastre a propriedade (nome, cidade, cultura).
3. Vá em **Configurações → Dispositivos → + Adicionar estação** e crie uma estação
   (ex.: "Estação 1"), com latitude/longitude se quiser vê-la no mapa.
4. Para simular leituras de sensores chegando (enquanto o firmware ESP32 real ainda não
   está enviando), rode no SQL Editor do Supabase:

```sql
insert into sensor_readings (station_id, soil_moisture_pct, air_temperature_c, air_humidity_pct, atmospheric_pressure_hpa, uv_index, battery_pct)
values ('COLE_O_ID_DA_ESTACAO', 68, 28.4, 56, 1012, 6.2, 87);

update stations set status = 'online', battery_pct = 87, last_seen_at = now()
where id = 'COLE_O_ID_DA_ESTACAO';
```

5. Vá em **Controle de Irrigação** e clique em **Iniciar irrigação** — isso grava um
   registro em `irrigation_events`, visível depois em **Histórico**.
6. Para ver um alerta na tela de **Notificações**:

```sql
insert into alerts (property_id, station_id, severity, title, message)
values ('COLE_O_ID_DA_PROPRIEDADE', 'COLE_O_ID_DA_ESTACAO', 'critico', 'Bateria baixa', 'A bateria da estação está com 15%.');
```

## 5. Conectando as estações ESP32 / Enviando via API

A rota de ingestão está disponível em `POST /api/ingest`.

Exemplo de envio via cURL:

```bash
curl -X POST http://localhost:3000/api/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "station_id": "03b777d4-0182-455d-8fc9-ebfa14a621e3",
    "soil_moisture_pct": 68.5,
    "air_temperature_c": 27.4,
    "air_humidity_pct": 58.0,
    "atmospheric_pressure_hpa": 1013.2,
    "uv_index": 6.1,
    "battery_pct": 92.0
  }'
```

Configuração necessária no `.env.local` (ou variáveis de ambiente na Vercel):
- `SUPABASE_SERVICE_ROLE_KEY`: chave `service_role` (encontrada no Supabase em **Project Settings → API**).
- `INGEST_API_KEY`: (opcional) se definida, a rota exigirá o cabeçalho `x-api-key`.

## Estrutura do projeto

```
app/
  login/            → RF-01 login
  cadastro/          → RF-01 cadastro
  (app)/
    dashboard/       → RF-13 painel resumido
    sensores/        → RF-08, RF-09, RF-10, RF-11, RF-14
    irrigacao/        → RF-16, RF-19, RF-20, RF-21, RF-22
    mapa/            → RF-15
    historico/        → RF-14, RF-22
    notificacoes/     → RF-23
    configuracoes/    → RF-02, RF-05, RF-29
lib/
  supabase/          → clientes Supabase (browser, server, middleware)
  data.ts            → funções de leitura de dados
supabase/
  schema.sql         → schema completo + RLS
```

## O que falta para além do MVP de hoje

- Rota de ingestão HTTPS para as estações ESP32 reais (RF-07).
- Serviço de IA para cálculo de evapotranspiração/demanda hídrica (RF-17, RF-18).
- Integração com previsão meteorológica (RF-33).
- Relatórios e exportação (RF-27, RF-28) — hoje pensados para a plataforma web
  administrativa, não incluída neste app.
- Mapa com tiles reais (Google Maps/Mapbox); o mapa atual é uma visualização leve sem
  chave de API, para publicar sem dependências externas hoje.
