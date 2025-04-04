
import React from 'react';
import BehavioralInsightsTab from './tabs/BehavioralInsightsTab';

interface RecommendationsSectionProps {
  recommendations: any[];
  onScheduleCall: () => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recommendations,
  onScheduleCall
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Health Insights</h2>
      
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-medium text-gray-900">Behavioral Insights</h3>
        </div>
        
        <BehavioralInsightsTab />
      </div>
    </div>
  );
};

export default RecommendationsSection;
