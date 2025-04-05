
import React from 'react';
import { cn } from '@/lib/utils';
import { StatusType } from './MetricCard';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  label, 
  className 
}) => {
  // Map status to color classes
  const getStatusClasses = (status: StatusType) => {
    switch(status) {
      case 'concerning':
        return 'bg-concerning-light text-concerning-dark';
      case 'mixed':
        return 'bg-mixed-light text-mixed-dark';
      case 'positive':
        return 'bg-positive-light text-positive-dark';
      case 'neutral':
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Map status to label if none provided
  const getLabel = () => {
    if (label) return label;
    
    switch(status) {
      case 'concerning':
        return 'Concerning';
      case 'mixed':
        return 'Mixed';
      case 'positive':
        return 'Positive';
      case 'neutral':
      default:
        return 'Neutral';
    }
  };

  return (
    <span className={cn(
      'status-badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      getStatusClasses(status),
      className
    )}>
      {getLabel()}
    </span>
  );
};

export default StatusIndicator;
