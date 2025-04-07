
import healthPulseJson from './healthPulseData.json';
import { HealthPulseItem, HabitTrend } from '@/types/dashboard';

export const healthPulseData: HealthPulseItem[] = healthPulseJson.healthPulseItems.map(item => ({
  ...item,
  trend: item.trend as 'up' | 'down' | 'stable',
  streakData: {
    ...item.streakData,
    status: item.streakData.status as 'improved' | 'declined' | 'stable'
  }
}));

export const weeklyInsights: string[] = healthPulseJson.weeklyInsights;
export const improvementSummaries: string[] = healthPulseJson.improvementSummaries;
export const needsAttentionSummaries: string[] = healthPulseJson.needsAttentionSummaries;

export const habitTrends: HabitTrend[] = healthPulseJson.habitTrends.map(trend => ({
  ...trend,
  direction: trend.direction as 'up' | 'down' | 'stable',
  status: trend.status as 'improved' | 'declined' | 'stable'
}));

// Export the full data object for direct access
export const healthPulseFullData = healthPulseJson;
