
import healthPulseJson from './healthPulseData.json';
import { HealthPulseItem } from '@/types/dashboard';

export const healthPulseData: HealthPulseItem[] = healthPulseJson.healthPulseItems;
export const weeklyInsights: string[] = healthPulseJson.weeklyInsights;
export const improvementSummaries: string[] = healthPulseJson.improvementSummaries;
export const needsAttentionSummaries: string[] = healthPulseJson.needsAttentionSummaries;
export const habitTrends = healthPulseJson.habitTrends;

// Export the full data object for direct access
export const healthPulseFullData = healthPulseJson;
