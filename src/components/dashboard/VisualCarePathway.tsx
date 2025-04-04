
import React from 'react';
import { Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisualCarePathwayProps {
  currentLevel: string;
}

export const VisualCarePathway: React.FC<VisualCarePathwayProps> = ({ currentLevel }) => {
  const levels = [
    { id: 'prevention', label: 'Prevention & Wellness', description: 'Proactive health maintenance' },
    { id: 'coaching', label: 'Health Coaching', description: 'Personalized guidance and support' },
    { id: 'monitoring', label: 'Remote Monitoring', description: 'Track vital health metrics' },
    { id: 'specialist', label: 'Specialist Care', description: 'Expert medical interventions' }
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-1 relative">
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
        
        {levels.map((level, index) => {
          const isActive = level.id === currentLevel;
          const isPast = index < levels.findIndex(l => l.id === currentLevel);
          
          return (
            <div key={level.id} className="z-10 flex flex-col items-center relative">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                isPast ? "bg-hana-green text-white" : 
                isActive ? "bg-hana-green text-white" : 
                "bg-gray-100 text-gray-500"
              )}>
                {isPast ? (
                  <Check className="w-5 h-5" />
                ) : isActive ? (
                  <Clock className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className={cn(
                "text-xs font-medium text-center max-w-[100px]",
                isPast || isActive ? "text-hana-green" : "text-gray-500"
              )}>
                {level.label}
              </div>
              <div className="text-xs text-gray-500 text-center max-w-[100px] mt-1">
                {level.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VisualCarePathway;
