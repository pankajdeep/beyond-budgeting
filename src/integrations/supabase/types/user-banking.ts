export interface Database {
  public: {
    Tables: {
      user_accounts: {
        Row: {
          account_id: string
          customer_id: string
          account_type: string
          account_number: string
          balance: number
          interest_rate: number | null
          created_at: string
          last_synced_at: string
        }
        Insert: {
          account_id?: string
          customer_id: string
          account_type: string
          account_number: string
          balance?: number
          interest_rate?: number | null
          created_at?: string
          last_synced_at?: string
        }
        Update: {
          account_id?: string
          customer_id?: string
          account_type?: string
          account_number?: string
          balance?: number
          interest_rate?: number | null
          created_at?: string
          last_synced_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_customer"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_transactions: {
        Row: {
          transaction_id: string
          account_id: string
          transaction_type: string
          amount: number
          description: string | null
          category: string | null
          transaction_date: string
          last_synced_at: string
        }
        Insert: {
          transaction_id?: string
          account_id: string
          transaction_type: string
          amount: number
          description?: string | null
          category?: string | null
          transaction_date?: string
          last_synced_at?: string
        }
        Update: {
          transaction_id?: string
          account_id?: string
          transaction_type?: string
          amount?: number
          description?: string | null
          category?: string | null
          transaction_date?: string
          last_synced_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_account"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "user_accounts"
            referencedColumns: ["account_id"]
          }
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
  }
}