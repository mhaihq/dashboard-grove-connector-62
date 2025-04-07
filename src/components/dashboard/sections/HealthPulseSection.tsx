
import React from 'react';
import { HealthPulse } from '@/components/dashboard/HealthPulse';
import { HealthPulseItem, HabitTrend } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { 
  healthPulseData, 
  weeklyInsights, 
  improvementSummaries, 
  needsAttentionSummaries,
  habitTrends 
} from '@/data/health/healthPulseData';

interface HealthPulseSectionProps {
  data?: HealthPulseItem[];
  mostImproved?: string;
  focusArea?: string;
  positiveAreas?: number;
  totalAreas?: number;
  environmentTips?: {
    title: string;
    tips: string[];
  };
  habitTrends?: HabitTrend[];
}

export const HealthPulseSection: React.FC<HealthPulseSectionProps> = ({
  data = healthPulseData,
  mostImproved = "Sleep",
  focusArea = "Emotional Regulation",
  positiveAreas = 4,
  totalAreas = 6,
  environmentTips,
  habitTrends: customHabitTrends = habitTrends
}) => {
  // Calculate improved and declined areas for visualization
  const improvedAreas = data
    .filter(item => item.trend === 'up')
    .map(item => ({
      area: item.area,
      change: item.trendPercentage
    }));
  
  const needsAttentionAreas = data
    .filter(item => item.trend === 'stable' && item.score < 60)
    .map(item => ({
      area: item.area,
      change: 0
    }));
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-br from-gray-50 to-white">
        <CardTitle className="flex items-center text-xl">
          <Activity className="w-5 h-5 text-blue-500 mr-2" />
          Your Weekly Health Pulse
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            A snapshot of how your habits and health are trending — drawn from your recent conversations.
          </p>
        </div>
        
        <HealthPulse 
          data={data}
          mostImproved={mostImproved}
          focusArea={focusArea}
          positiveAreas={positiveAreas}
          totalAreas={totalAreas}
          improvedAreas={improvedAreas}
          declinedAreas={needsAttentionAreas}
          weeklyInsights={weeklyInsights}
          improvementSummaries={improvementSummaries}
          needsAttentionSummaries={needsAttentionSummaries}
          habitTrends={customHabitTrends}
        />
      </CardContent>
    </Card>
  );
};

export default HealthPulseSection;
