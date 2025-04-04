
import React, { useState, useEffect } from 'react';
import { Activity, Sparkles, TrendingUp, AlertTriangle, ArrowUp, ArrowDown, ArrowRight, Calendar, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';

interface HealthPulseItem {
  area: string;
  score: number;
  initialScore: number;
  improving: boolean;
  priority?: boolean;
  tooltip?: string;
  trend?: 'up' | 'down' | 'stable';
  trendPercentage?: number;
  relatedTo?: string[];
  systemExplanation?: string;
  lastCheckInMention?: boolean;
  streakData?: {
    current: number;
    target: number;
    change: number;
    status: 'improved' | 'declined' | 'stable';
  };
}

interface HabitTrend {
  habit: string;
  icon: string;
  trend: string;
  direction: 'up' | 'down' | 'stable';
  current: number;
  target: number;
  status: 'improved' | 'declined' | 'stable';
}

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
  const [currentInsight, setCurrentInsight] = useState(0);
  
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
  
  const tooltips = {
    'Sleep': 'Quality and consistency of your rest patterns.',
    'Nutrition': 'Balance and quality of your dietary choices.',
    'Exercise': 'Frequency and intensity of physical activity.',
    'Stress': 'Your ability to manage daily pressures.',
    'Hydration': 'Daily water intake and hydration habits.',
    'Mood': 'Emotional well-being and stability.',
    'Energy': 'Overall vitality and stamina throughout the day.',
    'Social': 'Quality of your interpersonal connections.',
  };
  
  const formattedData = data.map(item => {
    let fillColor = item.priority 
      ? "url(#priorityGradient)" 
      : item.improving 
        ? "url(#improvingGradient)" 
        : "url(#neutralGradient)";
    
    const isMostImproved = item.area === calculatedMostImproved;
    const isFocusArea = item.area === calculatedFocusArea;
    
    if (isMostImproved) fillColor = "url(#mostImprovedGradient)";
    if (isFocusArea) fillColor = "url(#focusAreaGradient)";
    
    return {
      ...item,
      fill: fillColor,
      tooltip: item.tooltip || tooltips[item.area as keyof typeof tooltips] || `Your ${item.area.toLowerCase()} health dimension.`,
      changeText: item.trendPercentage 
        ? `${item.trendPercentage > 0 ? '+' : ''}${item.trendPercentage}%` 
        : (item.improving ? 'Improving' : 'Needs focus')
    };
  });

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <ArrowDown className="w-3 h-3 text-red-500" />;
      case 'stable':
      default:
        return <ArrowRight className="w-3 h-3 text-gray-500" />;
    }
  };

  const handleSliderChange = (value: number[]) => {
    setCurrentInsight(value[0]);
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-medium text-gray-800">Health Pattern Overview</h3>
            <Tooltip>
              <TooltipTrigger>
                <div className="text-xs text-gray-500 flex items-center">
                  <Info className="w-3 h-3 mr-1" />
                  Based on your last 3 check-ins
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">
                  This chart compares your current health metrics with those from 2 weeks ago.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="flex justify-center">
            <div className="h-[260px] w-full max-w-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={formattedData}>
                  <defs>
                    <linearGradient id="priorityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f87171" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0.5} />
                    </linearGradient>
                    <linearGradient id="improvingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.5} />
                    </linearGradient>
                    <linearGradient id="neutralGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1C6E4A" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#1C6E4A" stopOpacity={0.4} />
                    </linearGradient>
                    <linearGradient id="mostImprovedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.5} />
                    </linearGradient>
                    <linearGradient id="focusAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fb7185" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>
                  
                  <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                  <PolarAngleAxis 
                    dataKey="area" 
                    tick={(props) => {
                      const { x, y, payload, textAnchor } = props;
                      
                      return (
                        <g>
                          <text 
                            x={x} 
                            y={y} 
                            textAnchor={textAnchor} 
                            stroke="none" 
                            fill="#4b5563" 
                            fontSize={12} 
                            fontWeight={500}
                          >
                            {payload.value}
                          </text>
                        </g>
                      );
                    }}
                    stroke="#e5e7eb"
                    tickLine={false}
                  />
                  <PolarRadiusAxis 
                    domain={[0, 100]} 
                    tickCount={5}
                    tick={{ fontSize: 10 }}
                    stroke="#9ca3af"
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Radar
                    name="2 Weeks Ago"
                    dataKey="initialScore"
                    stroke="#94a3b8"
                    fill="#94a3b8"
                    fillOpacity={0.2}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                  <Radar
                    name="Current"
                    dataKey="score"
                    stroke="#1C6E4A"
                    fillOpacity={0.45}
                    strokeWidth={2}
                  />
                  <Legend 
                    align="center" 
                    verticalAlign="top"
                    height={30}
                    wrapperStyle={{ fontSize: '12px' }}
                    payload={[
                      { value: 'Current', color: '#1C6E4A' },
                      { value: '2 Weeks Ago', color: '#94a3b8' }
                    ]}
                  />
                  <RechartsTooltip 
                    formatter={(value, name) => [`${value}/100`, name]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      padding: '8px 12px',
                      fontSize: '12px'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-green-50 border border-green-100 rounded-lg p-3">
              <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-green-600" />
                Improvements this week:
              </h4>
              {improvementSummaries.map((summary, idx) => (
                <p key={idx} className="text-sm text-green-700 mb-1">
                  {summary}
                </p>
              ))}
            </div>
            
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
              <h4 className="text-sm font-medium text-amber-800 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1 text-amber-600" />
                Needs attention:
              </h4>
              {needsAttentionSummaries.map((summary, idx) => (
                <p key={idx} className="text-sm text-amber-700 mb-1">
                  {summary}
                </p>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-medium text-gray-800">This Week's Key Patterns</h3>
            <span className="text-xs text-gray-500">
              Pattern {currentInsight + 1} of {weeklyInsights.length}
            </span>
          </div>
          
          <Carousel
            className="w-full"
            onSelect={(api) => {
              if (api) {
                setCurrentInsight(api.selectedScrollSnap());
              }
            }}
          >
            <CarouselContent>
              {weeklyInsights.map((insight, index) => (
                <CarouselItem key={index}>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div>
                      <p className="text-blue-800 font-medium">
                        {insight}
                      </p>
                      <p className="mt-3 text-sm text-blue-700">
                        This was mentioned in 3 of your last 4 calls.
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center mt-4">
              <CarouselPrevious className="static transform-none mx-2" />
              <CarouselNext className="static transform-none mx-2" />
            </div>
          </Carousel>
          
          <div className="mt-2 text-xs text-gray-500">
            Pattern origin: Based on voice conversation & streak data
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default HealthPulse;
