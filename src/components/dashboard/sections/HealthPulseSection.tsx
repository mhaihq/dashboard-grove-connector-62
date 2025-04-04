
import React from 'react';
import { HealthPulse } from '@/components/dashboard/HealthPulse';
import { HealthPulseItem } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { healthPulseData, weeklyInsights, improvementSummaries, needsAttentionSummaries } from '@/data/health/healthPulseData';

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
}

// Define the enhanced version of HealthPulseItem with all the additional properties
interface EnhancedHealthPulseItem extends HealthPulseItem {
  trend: 'up' | 'down' | 'stable';
  relatedTo: string[];
  trendPercentage: number;
  systemExplanation: string;
  lastCheckInMention: boolean;
  streakData: {
    current: number;
    target: number;
    change: number;
    status: 'improved' | 'declined' | 'stable';
  };
}

export const HealthPulseSection: React.FC<HealthPulseSectionProps> = ({
  data = healthPulseData,
  mostImproved = "Sleep",
  focusArea = "Emotional Regulation",
  positiveAreas = 4,
  totalAreas = 6,
  environmentTips
}) => {
  // Enhance data with additional metrics for the new design
  const enhancedData: EnhancedHealthPulseItem[] = data.map(item => ({
    ...item,
    trend: item.improving ? 'up' : 'stable',
    relatedTo: ['sleep', 'nutrition'],
    trendPercentage: item.improving ? Math.round((item.score - item.initialScore) / item.initialScore * 100) : 0,
    systemExplanation: item.improving 
      ? `Your ${item.area.toLowerCase()} system is working well`
      : `Consider adjusting your ${item.area.toLowerCase()} routine`,
    lastCheckInMention: Math.random() > 0.5, // Simulate if it was mentioned in recent check-ins
    streakData: {
      current: Math.floor(Math.random() * 7) + 1,
      target: 7,
      change: Math.floor(Math.random() * 5) - 2,
      status: Math.random() > 0.6 ? 'improved' : (Math.random() > 0.5 ? 'declined' : 'stable')
    }
  }));
  
  // Calculate improved and declined areas for visualization
  const improvedAreas = enhancedData
    .filter(item => item.trend === 'up')
    .map(item => ({
      area: item.area,
      change: item.trendPercentage
    }));
  
  const needsAttentionAreas = enhancedData
    .filter(item => item.trend === 'stable' && item.score < 60)
    .map(item => ({
      area: item.area,
      change: 0
    }));
  
  // Track habits for micro-habit tracker
  const habitTrends = [
    {
      habit: 'Morning Walks',
      icon: '🥾',
      trend: '+1 day',
      direction: 'up' as const,
      current: 5,
      target: 7,
      status: 'improved' as const
    },
    {
      habit: 'Hydration',
      icon: '💧',
      trend: '-2 days',
      direction: 'down' as const,
      current: 3,
      target: 7,
      status: 'declined' as const
    },
    {
      habit: 'Alcohol-Free Days',
      icon: '🍷',
      trend: '=',
      direction: 'stable' as const,
      current: 2,
      target: 7,
      status: 'stable' as const
    }
  ];
  
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
          data={enhancedData as any /* Using type assertion to satisfy TypeScript */}
          mostImproved={mostImproved}
          focusArea={focusArea}
          positiveAreas={positiveAreas}
          totalAreas={totalAreas}
          improvedAreas={improvedAreas}
          declinedAreas={needsAttentionAreas}
          weeklyInsights={weeklyInsights}
          improvementSummaries={improvementSummaries}
          needsAttentionSummaries={needsAttentionSummaries}
          habitTrends={habitTrends}
        />
      </CardContent>
    </Card>
  );
};

export default HealthPulseSection;
