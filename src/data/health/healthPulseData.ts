
import { HealthPulseItem } from '@/types/dashboard';

export const healthPulseData: HealthPulseItem[] = [
  {
    area: "Sleep",
    score: 68,
    initialScore: 60,
    improving: true,
    priority: true
  },
  {
    area: "Social Support",
    score: 72,
    initialScore: 65,
    improving: true
  },
  {
    area: "Energy Level",
    score: 65,
    initialScore: 60,
    improving: true
  },
  {
    area: "Stress Management",
    score: 55,
    initialScore: 48,
    improving: true
  },
  {
    area: "Cognitive Function",
    score: 42,
    initialScore: 40,
    improving: true
  },
  {
    area: "Emotional Regulation",
    score: 35,
    initialScore: 35,
    improving: false
  }
];

// AI-generated insights based on the health pulse data patterns
export const weeklyInsights = [
  "You report less stress on days with evening routines and 7+ hours of sleep.",
  "Stress is lower on days with a structured evening routine.",
  "Mood stabilized on days with social interaction.",
  "Your energy levels are higher when you exercise before noon.",
  "Your sleep quality improves on nights when you avoid screen time 1+ hour before bed."
];

export const improvementSummaries = [
  "Stress regulation ↑ 8% — better sleep on structured days.",
  "Slight boost in energy levels."
];

export const needsAttentionSummaries = [
  "Hydration remains low. Correlated with afternoon fatigue.",
  "Emotional regulation unchanged."
];
