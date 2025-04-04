
import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react';

export interface MetricProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  status?: 'positive' | 'concerning' | 'warning' | 'neutral';
  icon?: React.ReactNode;
  color?: string;
}

const MetricCard: React.FC<MetricProps> = ({
  title,
  value,
  trend,
  trendValue,
  status = 'neutral',
  icon = <PieChart className="w-4 h-4" />,
  color
}) => {
  return (
    <div className={cn(
      "border rounded-lg p-4 bg-white transition-all hover:shadow-sm",
      status === 'positive' ? "border-green-100" : 
      status === 'concerning' ? "border-red-100" : 
      status === 'warning' ? "border-amber-100" : 
      "border-gray-100"
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className={cn(
          "w-2 h-2 rounded-full",
          status === 'positive' ? "bg-green-500" : 
          status === 'concerning' ? "bg-red-500" : 
          status === 'warning' ? "bg-amber-500" : 
          "bg-gray-300"
        )} />
      </div>
      
      <div className="flex items-end justify-between">
        <div className={cn(
          "text-2xl font-bold",
          status === 'positive' ? "text-green-600" : 
          status === 'concerning' ? "text-red-600" : 
          status === 'warning' ? "text-amber-600" : 
          color ? `text-${color}-600` : "text-gray-900"
        )}>
          {value}
        </div>
        
        {trend && (
          <div className={cn(
            "flex items-center text-xs font-medium",
            trend === 'up' ? "text-green-600" : 
            trend === 'down' ? "text-red-600" : 
            "text-gray-500"
          )}>
            {trend === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3 mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
