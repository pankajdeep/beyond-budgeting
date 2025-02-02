export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bank_accounts: {
        Row: {
          account_name: string
          account_type: string
          balance: number
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          account_name: string
          account_type: string
          balance?: number
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          account_name?: string
          account_type?: string
          balance?: number
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number
          created_at: string
          financial_goals: string | null
          full_name: string
          id: string
          investment_horizon: string | null
          monthly_expenses: number | null
          monthly_income: number | null
          occupation: string
          risk_tolerance: string | null
        }
        Insert: {
          age: number
          created_at?: string
          financial_goals?: string | null
          full_name: string
          id: string
          investment_horizon?: string | null
          monthly_expenses?: number | null
          monthly_income?: number | null
          occupation: string
          risk_tolerance?: string | null
        }
        Update: {
          age?: number
          created_at?: string
          financial_goals?: string | null
          full_name?: string
          id?: string
          investment_horizon?: string | null
          monthly_expenses?: number | null
          monthly_income?: number | null
          occupation?: string
          risk_tolerance?: string | null
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          created_at: string
          description: string
          id: string
          priority: number
          recommendation_type: string
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          priority: number
          recommendation_type: string
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          priority?: number
          recommendation_type?: string
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          bank_account_id: string
          category: string | null
          date: string
          description: string | null
          id: string
          transaction_type: string
        }
        Insert: {
          amount: number
          bank_account_id: string
          category?: string | null
          date?: string
          description?: string | null
          id?: string
          transaction_type: string
        }
        Update: {
          amount?: number
          bank_account_id?: string
          category?: string | null
          date?: string
          description?: string | null
          id?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_accounts: {
        Row: {
          account_id: string
          account_number: string
          account_type: string
          balance: number
          created_at: string
          customer_id: string
          interest_rate: number | null
          last_synced_at: string
        }
        Insert: {
          account_id?: string
          account_number: string
          account_type: string
          balance?: number
          created_at?: string
          customer_id: string
          interest_rate?: number | null
          last_synced_at?: string
        }
        Update: {
          account_id?: string
          account_number?: string
          account_type?: string
          balance?: number
          created_at?: string
          customer_id?: string
          interest_rate?: number | null
          last_synced_at?: string
        }
        Relationships: []
      }
      user_transactions: {
        Row: {
          account_id: string
          amount: number
          category: string | null
          description: string | null
          last_synced_at: string
          transaction_date: string
          transaction_id: string
          transaction_type: string
        }
        Insert: {
          account_id: string
          amount: number
          category?: string | null
          description?: string | null
          last_synced_at?: string
          transaction_date?: string
          transaction_id?: string
          transaction_type: string
        }
        Update: {
          account_id?: string
          amount?: number
          category?: string | null
          description?: string | null
          last_synced_at?: string
          transaction_date?: string
          transaction_id?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_account"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "user_accounts"
            referencedColumns: ["account_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
