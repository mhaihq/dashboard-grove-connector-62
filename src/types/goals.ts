export interface Goal {
  id: string;
  title: string;
  duration: 'Short-Term' | 'Medium-Term' | 'Long-Term';
  startDate: string;
  endDate: string;
  target: {
    count: number;
    unit: string;
  };
  progress: number;
  category: string;
  source: 'Hana Suggested' | 'Personal';
  checkIns?: {
    date: string;
    note: string;
  }[];
  nudge?: string;
  evidence?: string;
  benefits?: string[];
  difficulty?: 'hard';
  term?: 'short term' | 'medium term' | 'long term';
  description?: string;
}
