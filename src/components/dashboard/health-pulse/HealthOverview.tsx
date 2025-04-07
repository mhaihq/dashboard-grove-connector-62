
import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HealthPulseItem } from '@/types/dashboard';
import HealthRadarChart from './HealthRadarChart';
import SummariesSection from './SummariesSection';

interface HealthOverviewProps {
  data: HealthPulseItem[];
  improvementSummaries: string[];
  needsAttentionSummaries: string[];
}

export const HealthOverview: React.FC<HealthOverviewProps> = ({ 
  data,
  improvementSummaries,
  needsAttentionSummaries
}) => {
  return (
    <TooltipProvider>
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
          <HealthRadarChart data={data} />
        </div>
        
        <SummariesSection 
          improvementSummaries={improvementSummaries}
          needsAttentionSummaries={needsAttentionSummaries}
        />
      </div>
    </TooltipProvider>
  );
};

export default HealthOverview;
