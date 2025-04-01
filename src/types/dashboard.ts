
import { ReactNode } from 'react';

export interface HealthIndicator {
  title: string;
  value: string;
  change: string;
  icon: () => ReactNode;
}

export interface CarePlanItem {
  title: string;
  icon: () => ReactNode;
  status: "not-started" | "started" | "in-progress" | "complete";
  description: string;
}

export interface Milestone {
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

export interface HealthPulseItem {
  area: string;
  score: number;
  improving: boolean;
}

export interface OverviewItem {
  title: string;
  items: string[];
}

export interface JournalEntry {
  text: string;
  status: 'positive' | 'neutral' | 'negative';
}

export interface ProgramItem {
  program: string;
  match: "none" | "perfect" | "good" | "possible";
  status: "Enrolled" | "Available" | "Eligible" | "Not Eligible";
  description: string;
  action?: string;
  relevantAreas?: string[];
}

export interface FunctionalArea {
  title: string;
  key: string;
  rating: number;
  status: string;
  observations: string[];
  evidence: string;
}

export interface ClinicalRecommendation {
  title: string;
  relatedAreas: string[];
  description: string;
  priority: "high" | "medium" | "low";
  icon: "thermometer" | "brain" | "heart" | "footprints" | "clipboard" | "shield" | "book";
  timeframe: string;
  difficulty: "easy" | "moderate" | "challenging";
  steps: string[];
  actionLabel: string;
  actionType: "self" | "followup" | "call";
}

export interface MedicareProgram {
  name: string;
  description: string;
  eligibility: string;
  coverage: string;
  benefits: string[];
  icon: "thermometer" | "brain" | "heart" | "footprints" | "clipboard" | "shield" | "book";
}

export interface MilestonesData {
  weeklyPoints: number;
  level: number;
  levelName: string;
  nextLevel: string;
  pointsToNextLevel: number;
  achievements: {
    title: string;
    unlocked: boolean;
    progress: number;
    icon: ReactNode;
  }[];
}
