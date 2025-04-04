
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
