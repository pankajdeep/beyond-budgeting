export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
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
  }
}