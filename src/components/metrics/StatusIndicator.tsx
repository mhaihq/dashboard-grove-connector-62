
import React from 'react';
import { cn } from '@/lib/utils';
import { StatusType } from './MetricCard';

interface StatusIndicatorProps {
  status: StatusType;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const getStatusLabel = (status: StatusType): string => {
    switch(status) {
      case 'positive':
        return 'Strong';
      case 'mixed':
        return 'Moderate';
      case 'concerning':
        return 'Needs Focus';
      default:
        return '';
    }
  };

  return (
    <div className={cn(
      "px-2 py-1 rounded-full text-xs font-medium",
      status === 'positive' ? "bg-positive-light text-positive" : 
      status === 'mixed' ? "bg-mixed-light text-mixed" : 
      "bg-concerning-light text-concerning"
    )}>
      {getStatusLabel(status)}
    </div>
  );
};

export default StatusIndicator;
