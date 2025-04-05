
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, ArrowRightIcon, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import StatusIndicator from './StatusIndicator';
import ProgressBar from './ProgressBar';

export type StatusType = 'concerning' | 'mixed' | 'positive' | 'neutral';

export interface MetricProps {
  title: string;
  status: StatusType;
  icon?: React.ReactNode;
  description?: string;
  value?: string | number;
  change?: { value: string | number; timeframe: string };
  insights?: string[];
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const MetricCard: React.FC<MetricProps> = ({
  title,
  status,
  icon,
  description,
  value,
  change,
  insights,
  trend,
  trendValue
}) => {
  // Helper to determine trend icon
  const renderTrendIcon = () => {
    switch(trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-positive" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-concerning" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  // Helper to determine trend text
  const getTrendText = () => {
    if (!trend || !trendValue) return null;
    
    const color = trend === 'up' 
      ? 'text-positive' 
      : trend === 'down' 
        ? 'text-concerning' 
        : 'text-gray-500';
    
    return (
      <span className={`text-sm font-medium flex items-center ${color}`}>
        {renderTrendIcon()}
        <span className="ml-1">{trendValue}</span>
      </span>
    );
  };

  return (
    <Card className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            {icon && <div className="mr-2 bg-gray-50 p-1.5 rounded-full">{icon}</div>}
            <h3 className="font-medium text-gray-800">{title}</h3>
          </div>
          <StatusIndicator status={status} />
        </div>
        
        {description && (
          <p className="text-sm text-gray-600 mb-3">{description}</p>
        )}
        
        {value !== undefined && (
          <div className="flex items-end justify-between mb-2">
            <div className="text-2xl font-semibold text-gray-900">{value}</div>
            {getTrendText()}
          </div>
        )}
        
        {change && (
          <div className="text-sm text-gray-500 mb-3">
            {change.value} in the last {change.timeframe}
          </div>
        )}
        
        <ProgressBar 
          progress={status === 'positive' ? 85 : status === 'mixed' ? 50 : 25} 
          status={status} 
          className="mb-3"
        />
        
        {insights && insights.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Insights</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-hana-green mr-1.5">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
