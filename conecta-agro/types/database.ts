export type UserRole = "agricultor" | "tecnico" | "administrador";
export type StationStatus = "online" | "atencao" | "offline";
export type IrrigationMode = "manual" | "automatico";
export type IrrigationStatus = "em_andamento" | "concluida" | "cancelada";
export type AlertSeverity = "info" | "atencao" | "critico";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: UserRole;
          phone: string | null;
          avatar_url: string | null;
          blocked: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          role?: UserRole;
          phone?: string | null;
          avatar_url?: string | null;
          blocked?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: UserRole;
          phone?: string | null;
          avatar_url?: string | null;
          blocked?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      properties: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          city: string | null;
          state: string | null;
          latitude: number | null;
          longitude: number | null;
          area_hectares: number | null;
          main_crop: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          city?: string | null;
          state?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          area_hectares?: number | null;
          main_crop?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          city?: string | null;
          state?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          area_hectares?: number | null;
          main_crop?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      stations: {
        Row: {
          id: string;
          property_id: string;
          plot_id: string | null;
          code: string;
          latitude: number | null;
          longitude: number | null;
          status: StationStatus;
          battery_pct: number | null;
          last_seen_at: string | null;
          offline_threshold_minutes: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          plot_id?: string | null;
          code: string;
          latitude?: number | null;
          longitude?: number | null;
          status?: StationStatus;
          battery_pct?: number | null;
          last_seen_at?: string | null;
          offline_threshold_minutes?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          plot_id?: string | null;
          code?: string;
          latitude?: number | null;
          longitude?: number | null;
          status?: StationStatus;
          battery_pct?: number | null;
          last_seen_at?: string | null;
          offline_threshold_minutes?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      sensor_readings: {
        Row: {
          id: number;
          station_id: string;
          recorded_at: string;
          soil_moisture_pct: number | null;
          air_temperature_c: number | null;
          air_humidity_pct: number | null;
          atmospheric_pressure_hpa: number | null;
          uv_index: number | null;
          water_flow_l: number | null;
          reservoir_level_pct: number | null;
          battery_pct: number | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          station_id: string;
          recorded_at?: string;
          soil_moisture_pct?: number | null;
          air_temperature_c?: number | null;
          air_humidity_pct?: number | null;
          atmospheric_pressure_hpa?: number | null;
          uv_index?: number | null;
          water_flow_l?: number | null;
          reservoir_level_pct?: number | null;
          battery_pct?: number | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          station_id?: string;
          recorded_at?: string;
          soil_moisture_pct?: number | null;
          air_temperature_c?: number | null;
          air_humidity_pct?: number | null;
          atmospheric_pressure_hpa?: number | null;
          uv_index?: number | null;
          water_flow_l?: number | null;
          reservoir_level_pct?: number | null;
          battery_pct?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
      irrigation_settings: {
        Row: {
          property_id: string;
          auto_mode_enabled: boolean;
          default_duration_minutes: number;
          soil_moisture_target_pct: number;
          updated_at: string;
        };
        Insert: {
          property_id: string;
          auto_mode_enabled?: boolean;
          default_duration_minutes?: number;
          soil_moisture_target_pct?: number;
          updated_at?: string;
        };
        Update: {
          property_id?: string;
          auto_mode_enabled?: boolean;
          default_duration_minutes?: number;
          soil_moisture_target_pct?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      irrigation_events: {
        Row: {
          id: string;
          property_id: string;
          station_id: string | null;
          mode: IrrigationMode;
          status: IrrigationStatus;
          started_at: string;
          ended_at: string | null;
          duration_minutes: number | null;
          water_used_l: number | null;
          triggered_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          station_id?: string | null;
          mode: IrrigationMode;
          status?: IrrigationStatus;
          started_at?: string;
          ended_at?: string | null;
          duration_minutes?: number | null;
          water_used_l?: number | null;
          triggered_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          station_id?: string | null;
          mode?: IrrigationMode;
          status?: IrrigationStatus;
          started_at?: string;
          ended_at?: string | null;
          duration_minutes?: number | null;
          water_used_l?: number | null;
          triggered_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      irrigation_recommendations: {
        Row: {
          id: string;
          property_id: string;
          recommended_for: string;
          should_irrigate: boolean;
          estimated_mm: number | null;
          reasoning: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          recommended_for?: string;
          should_irrigate: boolean;
          estimated_mm?: number | null;
          reasoning?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          recommended_for?: string;
          should_irrigate?: boolean;
          estimated_mm?: number | null;
          reasoning?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      alerts: {
        Row: {
          id: string;
          property_id: string;
          station_id: string | null;
          severity: AlertSeverity;
          title: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          station_id?: string | null;
          severity?: AlertSeverity;
          title: string;
          message: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          station_id?: string | null;
          severity?: AlertSeverity;
          title?: string;
          message?: string;
          read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      user_role: UserRole;
      station_status: StationStatus;
      irrigation_mode: IrrigationMode;
      irrigation_status: IrrigationStatus;
      alert_severity: AlertSeverity;
    };
    CompositeTypes: {};
  };
};
