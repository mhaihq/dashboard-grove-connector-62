import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import ProgressSection from '@/components/ProgressSection';
import UpcomingActions from '@/components/UpcomingActions';
import JourneySoFarSection from './sections/JourneySoFarSection';
import { Check, Clock, CalendarClock, Bell } from 'lucide-react';
import HealthPulseSection from './sections/HealthPulseSection';
import { healthPulseData } from '@/data/health/healthPulseData';
import { HealthPulseItem } from '@/types/dashboard';

interface DashboardProps {
  onScheduleCall?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onScheduleCall }) => {
  const userName = "Sarah";
  
  // Demo recommendations data
  const recommendations = [
    {
      title: "Gentle Movement",
      description: "Incorporate more regular, gentle movement into your daily routine to improve mobility and strength.",
      steps: [
        "Start with 10-minute morning stretches",
        "Take a 15-minute walk after lunch",
        "Try chair yoga 3 times per week (videos provided in resources)"
      ],
      priority: "high" as const,
      relatedAreas: ["Mobility", "Strength", "Cardiovascular"],
      timeframe: "Daily",
      difficulty: "easy" as const
    },
    {
      title: "Sleep Improvement",
      description: "Establish a consistent sleep routine to improve your sleep quality and overall energy levels.",
      steps: [
        "Set a consistent bedtime (10:30pm suggested)",
        "Create a 30-minute wind-down routine",
        "Limit screen time 1 hour before bed",
        "Make bedroom cool and dark"
      ],
      priority: "medium" as const,
      relatedAreas: ["Sleep", "Energy", "Mental Clarity"],
      timeframe: "Daily",
      difficulty: "moderate" as const
    },
    {
      title: "Social Connection",
      description: "Strengthen your social connections to improve mental wellbeing and provide support.",
      steps: [
        "Call one friend or family member weekly",
        "Explore community groups matching your interests",
        "Consider volunteer opportunities near you"
      ],
      priority: "medium" as const,
      relatedAreas: ["Mental Health", "Emotional Support", "Community"],
      timeframe: "Weekly",
      difficulty: "moderate" as const
    }
  ];
  
  // Demo upcoming actions
  const upcomingActions = [
    {
      title: "Schedule doctor follow-up",
      description: "Follow up with Dr. Smith about medication adjustment",
      dueDate: "2 days",
      priority: "high" as const
    },
    {
      title: "Try chair yoga session",
      description: "First session of recommended exercise program",
      dueDate: "3 days",
      priority: "medium" as const
    },
    {
      title: "Review sleep journal",
      description: "Track progress of new bedtime routine",
      dueDate: "5 days",
      priority: "low" as const
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardHeader 
        userName={userName} 
        userEmail="sarah@example.com" 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userName}!</h1>
            
            {/* Health Pulse Section - Using data from file */}
            <HealthPulseSection
              data={healthPulseData}
              mostImproved="Sleep"
              focusArea="Emotional Regulation"
              positiveAreas={4}
              totalAreas={6}
              environmentTips={{
                title: "Environmental Factors",
                tips: [
                  "Keep bedroom temperature between 65-68°F",
                  "Reduce noise and light during sleep hours",
                  "Morning sunlight exposure helps regulate sleep cycles"
                ]
              }}
            />
            
            {/* Journey Roadmap */}
            <div className="mb-8">
              <JourneySoFarSection />
            </div>
            
            {/* Progress Section */}
            <ProgressSection recommendations={recommendations} />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Actions</h2>
              </div>
              <UpcomingActions actions={upcomingActions} />
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <CalendarClock className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">Next Appointments</h2>
              </div>
              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Tomorrow, 2:00 PM</span>
                    </div>
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check className="w-3 h-3 mr-1" /> Confirmed
                    </span>
                  </div>
                  <h3 className="font-medium mt-1">Weekly Health Coaching Call</h3>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">March 15, 10:30 AM</span>
                    </div>
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      <Clock className="w-3 h-3 mr-1" /> Pending
                    </span>
                  </div>
                  <h3 className="font-medium mt-1">Dr. Smith - Medical Review</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
