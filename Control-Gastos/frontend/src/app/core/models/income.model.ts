export type IncomeType = 'fijo' | 'variable' | 'otro';

export interface Income {
  id: number;
  user_id: number;
  type: IncomeType;
  amount: number;
  description: string;
  income_date: string;
  period: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateIncomeRequest {
  type: IncomeType;
  amount: number;
  description: string;
  income_date: string;
  period: string;
  notes?: string;
}