
import React from 'react';
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
import { HealthPulseItem } from '@/types/dashboard';

interface HealthRadarChartProps {
  data: HealthPulseItem[];
}

export const HealthRadarChart: React.FC<HealthRadarChartProps> = ({ data }) => {
  const formattedData = data.map(item => {
    let fillColor = item.priority 
      ? "url(#priorityGradient)" 
      : item.improving 
        ? "url(#improvingGradient)" 
        : "url(#neutralGradient)";
    
    return {
      ...item,
      fill: fillColor,
      tooltip: `Your ${item.area.toLowerCase()} health dimension.`,
      changeText: item.trendPercentage 
        ? `${item.trendPercentage > 0 ? '+' : ''}${item.trendPercentage}%` 
        : (item.improving ? 'Improving' : 'Needs focus')
    };
  });

  return (
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
  );
};

export default HealthRadarChart;
