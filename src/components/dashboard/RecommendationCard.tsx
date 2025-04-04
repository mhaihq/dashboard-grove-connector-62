
import React from 'react';
import { Button } from '@/components/ui/button';
import { PhoneCall, CalendarCheck, ThumbsUp, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { ClinicalRecommendation } from '@/types/dashboard';

interface RecommendationCardProps {
  recommendation: ClinicalRecommendation;
  isClinical?: boolean;
  onAction: (recommendation: ClinicalRecommendation) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  isClinical = false,
  onAction
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-sm transition-all">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-medium text-gray-900">{recommendation.title}</h3>
        <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium
          ${recommendation.priority === 'high' ? "bg-red-100 text-red-800" :
            recommendation.priority === 'medium' ? "bg-amber-100 text-amber-800" :
            "bg-green-100 text-green-800"}`}>
          {recommendation.priority === 'high' ? 'High Priority' :
           recommendation.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-700 mb-4">{recommendation.description}</p>
        
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-700">{recommendation.rationale}</p>
          </div>
        </div>
        
        {recommendation.benefits.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Expected Benefits:</h4>
            <ul className="space-y-1 pl-5 list-disc">
              {recommendation.benefits.map((benefit, index) => (
                <li key={index} className="text-sm text-gray-700">{benefit}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {recommendation.timeframe && (
            <div className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              <span>{recommendation.timeframe}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            <div className={`w-2 h-2 rounded-full 
              ${recommendation.status === 'completed' ? "bg-green-500" : 
                recommendation.status === 'in-progress' ? "bg-blue-500" : 
                recommendation.status === 'scheduled' ? "bg-amber-500" : 
                "bg-gray-500"}`} 
            />
            <span>
              {recommendation.status === 'completed' ? "Completed" : 
               recommendation.status === 'in-progress' ? "In Progress" : 
               recommendation.status === 'scheduled' ? "Scheduled" : 
               "Not Started"}
            </span>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            className={isClinical 
              ? "border-blue-300 text-blue-700 hover:bg-blue-50" 
              : "border-hana-green text-hana-green hover:bg-hana-lightGreen"}
            onClick={() => onAction(recommendation)}
          >
            {isClinical ? (
              <>
                <PhoneCall className="mr-1.5 h-3.5 w-3.5" />
                Discuss With Doctor
              </>
            ) : recommendation.status === 'completed' ? (
              <>
                <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                Mark Complete
              </>
            ) : recommendation.status === 'scheduled' ? (
              <>
                <CalendarCheck className="mr-1.5 h-3.5 w-3.5" />
                View Schedule
              </>
            ) : (
              <>
                <ThumbsUp className="mr-1.5 h-3.5 w-3.5" />
                Add to Plan
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
