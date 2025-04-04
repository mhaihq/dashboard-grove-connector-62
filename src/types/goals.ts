
export interface Goal {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  duration_type: 'SHORT' | 'MEDIUM' | 'LONG';
  start_date: string;
  end_date: string;
  target: number;
  progress: number;
  origin: 'HANA' | 'PATIENT';
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'OVERDUE';
  created_at?: string;
  updated_at?: string;
}

// For compatibility with existing UI components
export interface FormattedGoal extends Goal {
  category: string;
  difficulty?: 'hard';
  term?: 'short term' | 'medium term' | 'long term';
  source: 'Hana Suggested' | 'Personal';
}
