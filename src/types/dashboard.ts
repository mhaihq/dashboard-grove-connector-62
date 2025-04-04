
export interface CarePlanItem {
  title: string;
  description: string;
  status: 'complete' | 'in-progress' | 'started' | 'not-started';
  icon: string;
  completedSteps?: number;
  totalSteps?: number;
  benefit?: string;
  timeCommitment?: string;
  nextStep?: string;
  priority?: 'high' | 'medium' | 'low';
  insights?: string;
}

export interface ClinicalRecommendation {
  title: string;
  description: string;
  rationale: string;
  priority: 'high' | 'medium' | 'low';
  benefits: string[];
  source: string;
  timeframe?: string;
  status: string;
  steps?: string[];
  whyItMatters?: string;
  icon?: string;
  actionType?: 'call' | 'self' | 'followup';
  relatedAreas?: string[];
  difficulty?: 'easy' | 'moderate' | 'challenging';
  actionLabel?: string;
  timeToResults?: string;
  quickTip?: string;
}

export interface MedicareProgram {
  name: string;
  originalName: string;
  description: string;
  icon: string;
  benefits: string[];
  coverage: string;
  eligibility: string;
  isEligible: boolean | "potential";
}

export interface HealthIndicator {
  id: string;
  title: string;
  value: string;
  change: 'improving' | 'declining' | 'stabilizing' | 'stable';
  icon: string;
  score: number;
  previousScore: number;
  maxScore: number;
  status: string;
  evidence: string;
  intakeReference?: string;
  updatedAt: string;
  actionItems?: string[];
  trendData?: number[];
  plainLanguage?: string;
  actionSuggestion?: string;
  nextSteps?: string;
}

export interface JournalEntry {
  id: string;
  text: string;
  status: 'positive' | 'negative' | 'neutral';
  date: string;
  relatedTo: string;
  streakCount?: number;
  previousStreakCount?: number;
  points?: number;
  evidence?: string;
  actionable?: boolean;
  weekNumber?: number;
  weekOf?: string;
}

export interface HealthPulseItem {
  area: string;
  score: number;
  initialScore: number;
  improving: boolean;
  priority?: boolean;
}

export interface HabitStreak {
  habit: string;
  icon: string;
  trend: string;
  direction: 'up' | 'down' | 'stable';
  current: number;
  target: number;
  status: 'improved' | 'declined' | 'stable';
  supportedGoal?: string;
}

export interface SystemSuggestion {
  suggestion: string;
  basedOn?: string;
}
