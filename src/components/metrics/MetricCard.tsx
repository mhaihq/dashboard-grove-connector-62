
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import ProgressBar from './ProgressBar';
import StatusIndicator from './StatusIndicator';

export type StatusType = 'positive' | 'mixed' | 'concerning';

export interface MetricProps {
  title: string;
  status: StatusType;
  value?: string;
  change?: string;
  icon?: React.ReactNode;
  description?: string;
  insights?: string[];
}

export const MetricCard: React.FC<MetricProps> = ({ 
  title, 
  status, 
  icon, 
  description, 
  value, 
  change, 
  insights 
}) => {
  const [expanded, setExpanded] = React.useState(false);
  
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-3 hover-scale text-left">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-base font-medium text-gray-900">{title}</h3>
        </div>
        <StatusIndicator status={status} />
      </div>
      
      {/* Display value and change if provided */}
      {(value || change) && (
        <div className="flex items-baseline justify-between mb-2">
          {value && <div className="text-2xl font-semibold">{value}</div>}
          {change && <div className="text-sm font-medium text-gray-500">{change}</div>}
        </div>
      )}
      
      <ProgressBar status={status} />
      
      {/* Show description or insights if available */}
      {(description || insights) && (
        <div className={cn(
          "mt-2 overflow-hidden transition-all duration-300",
          expanded ? "max-h-96" : "max-h-0"
        )}>
          {description && <p className="text-sm text-gray-600 mb-2">{description}</p>}
          
          {insights && insights.length > 0 && (
            <ul className="text-sm text-gray-600 space-y-1 pl-1">
              {insights.map((insight, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      {/* Show expand/collapse button if we have description or insights */}
      {(description || (insights && insights.length > 0)) && (
        <div className="mt-1 flex justify-end">
          <button 
            className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-900"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide Details" : "Show Details"}
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform",
              expanded ? "transform rotate-180" : ""
            )} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MetricCard;

