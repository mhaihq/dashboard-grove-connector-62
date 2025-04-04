
import React from 'react';
import { Book, Brain, Calendar, Clipboard, Footprints, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClinicalGuidelineCardProps {
  recommendation: {
    title: string;
    description: string;
    icon: string;
    steps: string[];
    whyItMatters: string;
    priority: string;
  };
}

const ClinicalGuidelineCard: React.FC<ClinicalGuidelineCardProps> = ({ recommendation }) => {
  const getIcon = () => {
    switch (recommendation.icon) {
      case "brain": return <Brain className="w-5 h-5" />;
      case "heart": return <Heart className="w-5 h-5" />;
      case "footprints": return <Footprints className="w-5 h-5" />;
      case "clipboard": return <Clipboard className="w-5 h-5" />;
      case "shield": return <Shield className="w-5 h-5" />;
      case "book": return <Book className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const getPriorityStyles = () => {
    switch (recommendation.priority) {
      case "high": return "bg-red-50 text-red-700 border-red-100";
      case "medium": return "bg-amber-50 text-amber-700 border-amber-100";
      default: return "bg-blue-50 text-blue-700 border-blue-100";
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center bg-blue-50 p-4 border-b border-gray-200">
        <div className="bg-white p-2.5 rounded-full mr-3 shadow-sm text-blue-600">
          {getIcon()}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{recommendation.title}</h3>
        </div>
      </div>
      
      <div className="p-5">
        <p className="text-gray-700 mb-4">{recommendation.description}</p>
        
        <div className={`p-4 rounded-lg border mb-4 ${getPriorityStyles()}`}>
          <h4 className="text-sm font-medium mb-1">Why It Matters:</h4>
          <p className="text-sm">{recommendation.whyItMatters}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span>Clinical Recommendation</span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
            Discuss With Doctor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClinicalGuidelineCard;
