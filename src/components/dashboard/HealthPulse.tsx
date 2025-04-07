
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { HealthPulseItem, HabitTrend } from '@/types/dashboard';
import HealthOverview from './health-pulse/HealthOverview';
import WeeklyInsightsCarousel from './health-pulse/WeeklyInsightsCarousel';

interface HealthPulseProps {
  data: HealthPulseItem[];
  mostImproved?: string;
  focusArea?: string;
  positiveAreas?: number;
  totalAreas?: number;
  improvedAreas?: {area: string, change: number}[];
  declinedAreas?: {area: string, change: number}[];
  weeklyInsights?: string[];
  improvementSummaries?: string[];
  needsAttentionSummaries?: string[];
  habitTrends?: HabitTrend[];
}

export const HealthPulse: React.FC<HealthPulseProps> = ({ 
  data, 
  mostImproved,
  focusArea,
  positiveAreas,
  totalAreas,
  improvedAreas = [],
  declinedAreas = [],
  weeklyInsights = [],
  improvementSummaries = [],
  needsAttentionSummaries = [],
  habitTrends = []
}) => {
  const improving = data.filter(item => item.improving);
  const needsWork = data.filter(item => !item.improving);
  
  const calculatedMostImproved = mostImproved || (improving.length > 0 
    ? improving.reduce((prev, current) => (prev.score > current.score) ? prev : current).area
    : null);
    
  const calculatedFocusArea = focusArea || (needsWork.length > 0 
    ? needsWork.reduce((prev, current) => (prev.score < current.score) ? prev : current).area
    : null);
  
  const calculatedPositiveCount = positiveAreas || data.filter(item => item.improving).length;
  const calculatedTotalAreas = totalAreas || data.length;

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 gap-6">
        <HealthOverview 
          data={data}
          improvementSummaries={improvementSummaries}
          needsAttentionSummaries={needsAttentionSummaries}
        />
        
        <WeeklyInsightsCarousel insights={weeklyInsights} />
      </div>
    </TooltipProvider>
  );
};

export default HealthPulse;
