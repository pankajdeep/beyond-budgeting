export interface Database {
  public: {
    Tables: {
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