export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      beta: {
        Row: {
          beta_date: string;
          body: string;
          created_at: string;
          gear_desc: string | null;
          id: number;
          lat: number;
          lon: number;
          media_url: string;
          safety_rating: Database["public"]["Enums"]["safety rating"];
          title: string;
        };
        Insert: {
          beta_date?: string;
          body: string;
          created_at?: string;
          gear_desc?: string | null;
          id?: number;
          lat?: number;
          lon?: number;
          media_url: string;
          safety_rating?: Database["public"]["Enums"]["safety rating"];
          title: string;
        };
        Update: {
          beta_date?: string;
          body?: string;
          created_at?: string;
          gear_desc?: string | null;
          id?: number;
          lat?: number;
          lon?: number;
          media_url?: string;
          safety_rating?: Database["public"]["Enums"]["safety rating"];
          title?: string;
        };
        Relationships: [];
      };
      request: {
        Row: {
          activity_type: string;
          beta_id: number | null;
          body: string;
          bounty_value: number | null;
          created_at: string;
          id: number;
          lat: number;
          lon: number;
          request_date: string;
          title: string;
        };
        Insert: {
          activity_type: string;
          beta_id?: number | null;
          body: string;
          bounty_value?: number | null;
          created_at?: string;
          id?: number;
          lat: number;
          lon: number;
          request_date: string;
          title: string;
        };
        Update: {
          activity_type?: string;
          beta_id?: number | null;
          body?: string;
          bounty_value?: number | null;
          created_at?: string;
          id?: number;
          lat?: number;
          lon?: number;
          request_date?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_request_beta_id_fkey";
            columns: ["beta_id"];
            isOneToOne: false;
            referencedRelation: "beta";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      "safety rating": "red" | "black" | "blue" | "green";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
