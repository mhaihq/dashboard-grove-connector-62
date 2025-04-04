
import React from 'react';
import { Shield, Brain, TrendingUp, Calendar, Lightbulb } from 'lucide-react';

interface JourneyMilestone {
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

export const JourneySoFarSection: React.FC = () => {
  const milestones: JourneyMilestone[] = [
    {
      title: "Intake Complete",
      date: "02/13",
      description: "Initial assessment done. We know your baseline",
      icon: <Shield className="w-5 h-5" />,
      completed: true
    },
    {
      title: "AI Follow-Ups Started",
      date: "02/20",
      description: "You're now receiving weekly check-ins",
      icon: <Brain className="w-5 h-5" />,
      completed: true
    },
    {
      title: "First Habit Momentum",
      date: "03/01",
      description: "You achieved a 5-day streak in morning walks",
      icon: <TrendingUp className="w-5 h-5" />,
      completed: true
    },
    {
      title: "First Insight Unlocked",
      date: "03/05",
      description: "System detected your sleep is better when you avoid screens...",
      icon: <Lightbulb className="w-5 h-5" />,
      completed: true
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Health Journey Roadmap</h2>
      
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200"></div>
        
        {/* Timeline Items */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-start gap-6 relative">
              {/* Circle Marker */}
              <div className="relative z-10 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-2 bg-gray-100 rounded-full">
                    {milestone.icon}
                  </div>
                  <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                </div>
                
                <div className="flex items-center text-gray-500 text-sm mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {milestone.date}
                </div>
                
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JourneySoFarSection;
