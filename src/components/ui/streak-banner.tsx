
import React from 'react';
import { cn } from '@/lib/utils';

interface StreakBannerProps {
  days: number;
  className?: string;
}

export const StreakBanner = ({ days, className }: StreakBannerProps) => {
  return (
    <div 
      className={cn(
        "absolute top-0 left-0 w-16 h-16 overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-16 h-16 bg-amber-500 rotate-45 origin-top-left -translate-y-1/2 flex items-center justify-center">
        <span className="text-white font-bold text-xs rotate-[-45deg] translate-x-[5px] translate-y-[18px] flex items-center">
          {days}d
          <span className="ml-0.5">🔥</span>
        </span>
      </div>
    </div>
  );
};
