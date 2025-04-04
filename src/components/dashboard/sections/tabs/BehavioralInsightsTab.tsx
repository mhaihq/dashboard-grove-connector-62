
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { functionalAreas } from '@/data/assessment/functionalAreas';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BehavioralInsightsTab: React.FC = () => {
  // Map of functional area insights to their respective areas
  const areaInsights = {
    sleep: {
      patterns: [
        "Better sleep quality (+23%) when wake-up time before 7am",
        "Sleep quality decreases by 40% with evening screen time",
        "7+ hours of sleep correlates with 30% lower stress levels"
      ],
      suggestion: "Try setting consistent wake times and reducing screen time 1 hour before bed"
    },
    socialSupport: {
      patterns: [
        "Social interactions boost mood for up to 2 days",
        "Weekly family calls correlate with improved mood scores",
        "In-person social activities reduce reported anxiety by 25%"
      ],
      suggestion: "Schedule at least one meaningful social interaction weekly"
    },
    energyLevel: {
      patterns: [
        "Morning exercise (before 9am) improves energy throughout the day",
        "Short afternoon walks boost evening energy levels",
        "Energy crashes less frequent on hydration-tracked days"
      ],
      suggestion: "Add 2-3 morning physical activity sessions and track water intake"
    },
    stressManagement: {
      patterns: [
        "Stress increases with work sessions over 8 hours",
        "5-minute breathing exercises reduce measured stress indicators",
        "Structured breaks correlate with better emotional regulation"
      ],
      suggestion: "Schedule firm work boundaries and implement brief mindfulness periods"
    },
    cognitiveFunction: {
      patterns: [
        "Breakfast within 1 hour of waking improves cognitive performance",
        "Mental clarity better on days with 10+ minute morning walks",
        "Task-switching reduced on days with scheduled focus blocks"
      ],
      suggestion: "Prepare simple breakfast options and add short morning walks"
    },
    emotionalRegulation: {
      patterns: [
        "Journaling correlates with improved emotional awareness scores",
        "Evening gratitude practice linked to better morning mood",
        "Emotional reactivity lower on days with adequate sleep"
      ],
      suggestion: "Try a 5-minute evening gratitude or reflection practice"
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
            They focus on connections between behaviors and health outcomes in key functional areas.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {functionalAreas.map(area => {
          const insights = areaInsights[area.key as keyof typeof areaInsights];
          if (!insights) return null;
          
          return (
            <Card key={area.key} className="overflow-hidden">
              <div className="p-4 border-b bg-white">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{area.title}</h3>
                  <Badge 
                    variant={area.status === "Positive" ? "outline" : 
                          area.status === "Mixed" ? "secondary" : "default"}
                    className={area.status === "Positive" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                             area.status === "Mixed" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" :
                             "bg-red-100 text-red-800 hover:bg-red-200"}
                  >
                    {area.status}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Observed Patterns:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  {insights.patterns.map((pattern, idx) => (
                    <li key={idx} className="text-sm text-gray-600">
                      {pattern}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Suggestion:</h4>
                  <p className="text-sm text-gray-600">{insights.suggestion}</p>
                </div>
                
                <div className="mt-3 flex justify-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">Create Goal</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Turn this insight into a tracked goal</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default BehavioralInsightsTab;
