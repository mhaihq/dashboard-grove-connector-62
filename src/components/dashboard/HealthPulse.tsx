
import React from 'react';
import { Activity, Sparkles, TrendingUp, AlertTriangle, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Line,
  Legend
} from 'recharts';

interface HealthPulseItem {
  area: string;
  score: number;
  initialScore: number; // Added initial score for comparison
  improving: boolean;
  priority?: boolean;
  tooltip?: string;
  trend?: 'up' | 'down' | 'stable';
  trendPercentage?: number; // Added percentage change
  relatedTo?: string[];
}

interface HealthPulseProps {
  data: HealthPulseItem[];
  mostImproved?: string;
  focusArea?: string;
  positiveAreas?: number;
  totalAreas?: number;
  improvedAreas?: {area: string, change: number}[]; // New prop for improved areas
  declinedAreas?: {area: string, change: number}[]; // New prop for declined areas
}

export const HealthPulse: React.FC<HealthPulseProps> = ({ 
  data, 
  mostImproved,
  focusArea,
  positiveAreas,
  totalAreas,
  improvedAreas = [],
  declinedAreas = []
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
  
  // Create data for comparison (current vs initial)
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
      // Format percentage change for display
      changeText: item.trendPercentage 
        ? `${item.trendPercentage > 0 ? '+' : ''}${item.trendPercentage}%` 
        : (item.improving ? 'Improving' : 'Needs focus')
    };
  });

  const connections = [
    { source: 'Sleep', target: 'Energy' },
    { source: 'Exercise', target: 'Mood' },
    { source: 'Nutrition', target: 'Energy' },
    { source: 'Stress', target: 'Sleep' },
    { source: 'Hydration', target: 'Energy' }
  ];

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

  return (
    <TooltipProvider>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-xl">
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-hana-green mr-2" />
              Health Snapshot
            </div>
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
              Updated Today
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-3">
          <div className="h-[280px] w-full">
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
                  <linearGradient id="connectionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="initialStateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                
                {connections.map((connection, idx) => {
                  const sourceIndex = formattedData.findIndex(item => item.area === connection.source);
                  const targetIndex = formattedData.findIndex(item => item.area === connection.target);
                  
                  if (sourceIndex >= 0 && targetIndex >= 0) {
                    const angle = (2 * Math.PI) / formattedData.length;
                    const sourceAngle = sourceIndex * angle;
                    const targetAngle = targetIndex * angle;
                    
                    const radius = 70;
                    const sourceX = 50 + radius * Math.sin(sourceAngle);
                    const sourceY = 50 - radius * Math.cos(sourceAngle);
                    const targetX = 50 + radius * Math.sin(targetAngle);
                    const targetY = 50 - radius * Math.cos(targetAngle);
                    
                    return (
                      <Line 
                        key={idx} 
                        type="linear" 
                        dataKey="score" 
                        stroke="url(#connectionGradient)" 
                        fill="none" 
                        strokeWidth={1} 
                        strokeDasharray="3 3"
                        dot={false}
                        activeDot={false}
                        data={[
                          { x: sourceX, y: sourceY, score: 0 },
                          { x: targetX, y: targetY, score: 0 }
                        ]}
                      />
                    );
                  }
                  return null;
                })}
                
                <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="area" 
                  tick={(props) => {
                    const { x, y, payload, textAnchor, stroke, radius } = props;
                    const item = formattedData.find(d => d.area === payload.value);
                    
                    return (
                      <g>
                        <text 
                          x={x} 
                          y={y} 
                          textAnchor={textAnchor} 
                          stroke="none" 
                          fill="#4b5563" 
                          fontSize={13} 
                          fontWeight={500}
                        >
                          {payload.value}
                        </text>
                        {item?.trend && (
                          <foreignObject 
                            x={x - 8} 
                            y={y + 2} 
                            width={16} 
                            height={16}
                          >
                            <div className="flex justify-center">
                              {getTrendIcon(item.trend)}
                            </div>
                          </foreignObject>
                        )}
                      </g>
                    );
                  }}
                  stroke="#e5e7eb"
                  tickLine={false}
                />
                <PolarRadiusAxis 
                  domain={[0, 100]} 
                  tickCount={5}
                  tick={{ fontSize: 11 }}
                  stroke="#9ca3af"
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                {/* Initial state radar - shown in gray */}
                <Radar
                  name="Initial State"
                  dataKey="initialScore"
                  stroke="#94a3b8"
                  fill="url(#initialStateGradient)"
                  fillOpacity={0.2}
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
                {/* Current state radar */}
                <Radar
                  name="Current State"
                  dataKey="score"
                  stroke="#1C6E4A"
                  fillOpacity={0.45}
                  strokeWidth={2}
                />
                <Legend 
                  align="center" 
                  verticalAlign="top"
                  height={36} 
                  payload={[
                    { value: 'Current State', color: '#1C6E4A' },
                    { value: 'Initial State', color: '#94a3b8' }
                  ]}
                />
                <RechartsTooltip 
                  formatter={(value, name) => {
                    if (name === "Current State") {
                      return [`${value}/100`, 'Current Score'];
                    }
                    return [`${value}/100`, 'Initial Score'];
                  }}
                  labelFormatter={(label) => {
                    const item = formattedData.find(d => d.area === label);
                    const change = item && item.score && item.initialScore 
                      ? Math.round(((item.score - item.initialScore) / item.initialScore) * 100) 
                      : null;
                    
                    return (
                      <div>
                        <div className="font-medium text-gray-800">{label}</div>
                        <div className="text-xs text-gray-600 mt-1">{item?.tooltip}</div>
                        {change !== null && (
                          <div className={`text-xs font-medium mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {change >= 0 ? `+${change}%` : `${change}%`} from initial
                          </div>
                        )}
                      </div>
                    );
                  }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '10px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
                    padding: '10px 14px',
                    fontSize: '14px'
                  }}
                  cursor={{ strokeDasharray: '8 8' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Highlights and Areas of Improvement */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What improved */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-3">
              <h3 className="text-sm font-medium text-green-800 flex items-center mb-2">
                <ArrowUp className="w-4 h-4 mr-1 text-green-600" />
                What Improved
              </h3>
              {improvedAreas.length > 0 ? (
                <ul className="space-y-1.5">
                  {improvedAreas.map((item, idx) => (
                    <li key={idx} className="text-sm text-green-700 flex items-start">
                      <span className="text-green-500 mr-1.5">•</span>
                      <span>{item.area}: <span className="font-medium">+{item.change}%</span> from initial</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-700">
                  Continue with your current routines to see improvements.
                </p>
              )}
            </div>
            
            {/* What declined or needs focus */}
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
              <h3 className="text-sm font-medium text-amber-800 flex items-center mb-2">
                <AlertTriangle className="w-4 h-4 mr-1 text-amber-600" />
                Needs Focus
              </h3>
              {declinedAreas.length > 0 ? (
                <ul className="space-y-1.5">
                  {declinedAreas.map((item, idx) => (
                    <li key={idx} className="text-sm text-amber-700 flex items-start">
                      <span className="text-amber-500 mr-1.5">•</span>
                      <span>{item.area}: <span className="font-medium">{item.change}%</span> change</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-amber-700">
                  Focus on your hydration habits and maintaining consistent sleep patterns.
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex flex-wrap gap-3">
              {calculatedMostImproved && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center text-gray-700 cursor-help">
                      <Sparkles className="w-4 h-4 text-amber-500 mr-1.5" />
                      <span>Most Improved: <span className="font-medium">{calculatedMostImproved}</span></span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white p-2 text-xs max-w-[200px]">
                    <p>This area has shown the greatest improvement over the past 2 weeks.</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              {calculatedFocusArea && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center text-gray-700 cursor-help">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mr-1.5" />
                      <span>Focus Area: <span className="font-medium">{calculatedFocusArea}</span></span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white p-2 text-xs max-w-[200px]">
                    <p>This dimension needs your attention in the coming weeks.</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            
            <div className="flex items-center text-gray-600">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1.5" />
              <span>Trending positively in <span className="font-medium text-green-600">{calculatedPositiveCount} out of {calculatedTotalAreas}</span> areas</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default HealthPulse;
