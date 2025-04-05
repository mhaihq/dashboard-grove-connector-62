
import React from 'react';
import { cn } from '@/lib/utils';
import { StatusType } from './MetricCard';

interface ProgressBarProps {
  progress: number;
  status: StatusType;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  status, 
  className 
}) => {
  // Map status to color classes
  const getStatusColor = (status: StatusType) => {
    switch(status) {
      case 'concerning':
        return 'bg-concerning';
      case 'mixed':
        return 'bg-mixed';
      case 'positive':
        return 'bg-positive';
      case 'neutral':
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className={cn("w-full h-1.5 bg-gray-100 rounded-full overflow-hidden", className)}>
      <div 
        className={cn("h-full rounded-full", getStatusColor(status))}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
