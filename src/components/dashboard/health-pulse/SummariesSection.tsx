
import React from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';

interface SummariesSectionProps {
  improvementSummaries: string[];
  needsAttentionSummaries: string[];
}

export const SummariesSection: React.FC<SummariesSectionProps> = ({ 
  improvementSummaries,
  needsAttentionSummaries
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="bg-green-50 border border-green-100 rounded-lg p-3">
        <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
          <Sparkles className="w-4 h-4 mr-1 text-green-600" />
          Improvements this week:
        </h4>
        {improvementSummaries.map((summary, idx) => (
          <p key={idx} className="text-sm text-green-700 mb-1">
            {summary}
          </p>
        ))}
      </div>
      
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
        <h4 className="text-sm font-medium text-amber-800 mb-2 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-1 text-amber-600" />
          Needs attention:
        </h4>
        {needsAttentionSummaries.map((summary, idx) => (
          <p key={idx} className="text-sm text-amber-700 mb-1">
            {summary}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SummariesSection;
