
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { functionalAreas } from '@/data/assessment/functionalAreas';
import { Card } from '@/components/ui/card';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const BehavioralInsightsTab: React.FC = () => {
  // Combined behavioral patterns that link multiple functional areas
  const behavioralInsights = [
    {
      title: "Better Sleep When Waking Early",
      tags: ["sleep", "energyLevel"],
      pattern: "You woke before 7am on 3 days last week.",
      result: "Your reported sleep quality improved by +23% on those days.",
      suggestion: "Try keeping your wake time before 7am 3x next week.",
      relatedAreas: ["sleep", "energyLevel"],
      patternType: "helpful" // helpful, neutral, hindering
    },
    {
      title: "Social Interactions Boost Mood",
      tags: ["socialSupport", "emotionalRegulation"],
      pattern: "You had meaningful social interactions on 2 days last week.",
      result: "Your mood scores remained elevated for up to 48 hours after each interaction.",
      suggestion: "Schedule at least one quality social interaction weekly.",
      relatedAreas: ["socialSupport", "emotionalRegulation"],
      patternType: "helpful"
    },
    {
      title: "Evening Screen Time Affects Sleep",
      tags: ["sleep", "stressManagement"],
      pattern: "On 4 nights, you used screens within an hour of bedtime.",
      result: "Sleep quality decreased by 40% on those nights compared to screen-free evenings.",
      suggestion: "Try a digital sunset 1 hour before bed at least 3 nights this week.",
      relatedAreas: ["sleep", "stressManagement"],
      patternType: "hindering"
    },
    {
      title: "Morning Activity Improves Focus",
      tags: ["energyLevel", "cognitiveFunction"],
      pattern: "You took morning walks on 3 days last week.",
      result: "Your focus scores were 27% higher on those days compared to non-walking days.",
      suggestion: "Continue morning physical activity at least 3x weekly.",
      relatedAreas: ["energyLevel", "cognitiveFunction"],
      patternType: "helpful"
    },
    {
      title: "Structured Breaks Reduce Stress",
      tags: ["stressManagement", "cognitiveFunction"],
      pattern: "You took scheduled breaks during 3 workdays last week.",
      result: "Stress indicators were 18% lower on days with structured breaks.",
      suggestion: "Implement the 50/10 technique: 50 minutes of work followed by 10 minutes of rest.",
      relatedAreas: ["stressManagement", "cognitiveFunction"],
      patternType: "helpful"
    },
    {
      title: "Late Night Alcohol Consumption",
      tags: ["sleep", "stressManagement"],
      pattern: "You consumed alcohol within 3 hours of bedtime on 5 nights last week.",
      result: "Your deep sleep duration reduced by 35% on those nights.",
      suggestion: "Try to avoid alcohol at least 4 hours before bedtime.",
      relatedAreas: ["sleep", "stressManagement"],
      patternType: "hindering"
    },
    {
      title: "Weekend Exercise Patterns",
      tags: ["energyLevel", "emotionalRegulation"],
      pattern: "You exercise consistently on weekends but rarely on weekdays.",
      result: "No significant impact on overall weekly mood or energy metrics.",
      suggestion: "Your current pattern works well for your lifestyle. Maintain it if it feels sustainable.",
      relatedAreas: ["energyLevel", "emotionalRegulation"],
      patternType: "neutral"
    }
  ];

  // Function to get area name from key
  const getAreaNameFromKey = (key: string): string => {
    const area = functionalAreas.find(area => area.key === key);
    return area ? area.title : key;
  };

  // Function to get badge variant based on pattern type
  const getPatternBadgeStyle = (patternType: string) => {
    switch (patternType) {
      case "helpful":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "hindering":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "neutral":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  // Function to get pattern type label
  const getPatternTypeLabel = (patternType: string) => {
    switch (patternType) {
      case "helpful":
        return "Helpful";
      case "hindering":
        return "Hindering";
      case "neutral":
        return "Neutral";
      default:
        return "";
    }
  };

  return (
    <TooltipProvider>
      <div className="mb-5 bg-amber-50 border border-amber-100 rounded-lg p-3 flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-amber-800 font-medium">How these insights work</p>
          <p className="text-sm text-amber-700">
            These patterns are observed from your conversations, tracking data, and journal entries.
            They focus on connections between behaviors and outcomes across different functional areas.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {behavioralInsights.map((insight, index) => (
          <Card key={index} className="overflow-hidden border-gray-200 hover:shadow-sm transition-all">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                <Badge className={cn(getPatternBadgeStyle(insight.patternType), "ml-2")}>
                  {getPatternTypeLabel(insight.patternType)}
                </Badge>
              </div>
              
              <div className="mb-3 flex flex-wrap gap-2">
                {insight.tags.map((tag, idx) => (
                  <span key={idx} className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {getAreaNameFromKey(tag)}
                  </span>
                ))}
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-medium">• Pattern:</p>
                  <p className="text-gray-600">{insight.pattern}</p>
                </div>
                
                <div>
                  <p className="text-gray-700 font-medium">• Result:</p>
                  <p className="text-gray-600">{insight.result}</p>
                </div>
                
                <div>
                  <p className="text-gray-700 font-medium">• Suggestion:</p>
                  <p className="text-gray-600">{insight.suggestion}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default BehavioralInsightsTab;

