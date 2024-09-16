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
      beta_reports: {
        Row: {
          beta_type: string;
          fun_type: `Type ${0 | 1 | 2 | 3}`;
          body: string;
          created_at: string;
          date: string;
          do_it_again: boolean;
          gear: Json;
          id: string;
          location: number[];
          location_desc: string;
          spice: 1 | 2 | 3 | 4 | 5;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          beta_type?: string | null;
          body: string;
          created_at?: string;
          date: string;
          do_it_again?: boolean | null;
          fun_type: string;
          gear?: Json | null;
          id?: string;
          location: number[];
          location_desc?: string | null;
          spice?: number | null;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          beta_type?: string | null;
          body?: string;
          created_at?: string;
          date?: string;
          do_it_again?: boolean | null;
          fun_type?: string;
          gear?: Json | null;
          id?: string;
          location?: number[];
          location_desc?: string | null;
          spice?: number | null;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "beta_reports_user_id_fkey1";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      bounties: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          location: string;
          reward_amount: number;
          status: string;
          title: string;
          updated_at: string | null;
          user_id: string | null;
          valid_from: string;
          valid_until: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          location: string;
          reward_amount: number;
          status: string;
          title: string;
          updated_at?: string | null;
          user_id?: string | null;
          valid_from: string;
          valid_until: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          location?: string;
          reward_amount?: number;
          status?: string;
          title?: string;
          updated_at?: string | null;
          user_id?: string | null;
          valid_from?: string;
          valid_until?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bounties_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      bounty_claims: {
        Row: {
          beta_report_id: string | null;
          bounty_id: string | null;
          claimer_id: string | null;
          created_at: string | null;
          id: string;
          status: string;
          updated_at: string | null;
        };
        Insert: {
          beta_report_id?: string | null;
          bounty_id?: string | null;
          claimer_id?: string | null;
          created_at?: string | null;
          id?: string;
          status: string;
          updated_at?: string | null;
        };
        Update: {
          beta_report_id?: string | null;
          bounty_id?: string | null;
          claimer_id?: string | null;
          created_at?: string | null;
          id?: string;
          status?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bounty_claims_beta_report_id_fkey";
            columns: ["beta_report_id"];
            isOneToOne: false;
            referencedRelation: "beta_reports";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bounty_claims_bounty_id_fkey";
            columns: ["bounty_id"];
            isOneToOne: false;
            referencedRelation: "bounties";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bounty_claims_claimer_id_fkey";
            columns: ["claimer_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      payments: {
        Row: {
          amount: number;
          bounty_claim_id: string | null;
          created_at: string | null;
          id: string;
          status: string;
          stripe_payment_id: string | null;
          user_id: string | null;
        };
        Insert: {
          amount: number;
          bounty_claim_id?: string | null;
          created_at?: string | null;
          id?: string;
          status: string;
          stripe_payment_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          amount?: number;
          bounty_claim_id?: string | null;
          created_at?: string | null;
          id?: string;
          status?: string;
          stripe_payment_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "payments_bounty_claim_id_fkey";
            columns: ["bounty_claim_id"];
            isOneToOne: false;
            referencedRelation: "bounty_claims";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string | null;
          email: string;
          full_name: string;
          id: string;
          is_premium: boolean | null;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          full_name: string;
          id?: string;
          is_premium?: boolean | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          full_name?: string;
          id?: string;
          is_premium?: boolean | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
        };
        Relationships: [];
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

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
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
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
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
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
