
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { JournalEntry } from '@/components/JournalEntry';
import MentalHealthSummary from '@/components/MentalHealthSummary';

const FollowupReport = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  
  // Journal entries history
  const journalEntries = [
    {
      date: "2025-03-15",
      timestamp: "14:07:23",
      title: "Feeling Better Overall",
      content: "The user noted they are feeling better than before, with a definite improvement in mood and slightly better energy. Stress levels remain stable with no major changes mentioned.",
      highlight: "The user recognized their mood is definitely improving.",
      expanded: true
    },
    {
      date: "2025-03-13",
      timestamp: "18:11:23",
      title: "Reflections on Depression and Alcohol Usage",
      content: "The user shares experiences of ongoing depression and difficulty reducing alcohol intake. They've also expressed concern over job searching and financial stress, feeling generally tired, and seeking suggestions.",
      highlight: "Recognizing the link between depression and alcohol consumption, along with financial and job-search stress."
    },
    {
      date: "2025-03-10",
      timestamp: "09:22:15",
      title: "Sleep Improvements",
      content: "The user reported better sleep after implementing the suggested routine changes. They're now getting an average of 7 hours per night compared to 5 hours previously. Morning fatigue has decreased notably.",
      highlight: "Sleep duration increased by approximately 2 hours per night with new bedtime routine."
    },
    {
      date: "2025-03-05",
      timestamp: "16:42:11",
      title: "Social Engagement Progress",
      content: "The user met with two friends for coffee this week, marking the first social outing in over a month. They described feeling anxious before the meeting but ultimately enjoyed the interaction and felt better afterward.",
      highlight: "First social engagement in a month resulted in positive emotions despite initial anxiety."
    }
  ];

  // Mental health summary items for high-level overview
  const summaryItems = [
    {
      title: "Progress Summary",
      content: [
        "Mood has shown consistent improvement over the last 2 weeks",
        "Sleep quality significantly better with new evening routine",
        "Social engagement increasing with reduced anxiety"
      ],
      type: "notable" as const
    },
    {
      title: "Areas of Joy",
      content: [
        "Reported feeling genuinely happy during social coffee meetings",
        "Finding joy in morning walks and better sleep quality",
        "Expressed satisfaction with health coaching progress"
      ],
      type: "joy" as const
    },
    {
      title: "Areas to Focus On",
      content: [
        "Continue monitoring alcohol consumption patterns",
        "Develop more strategies for financial stress management",
        "Further build daily structure to support mental health"
      ],
      type: "weighing" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px]">
        <DashboardHeader 
          userName={userName} 
          userEmail={userEmail}
        />
        
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Followup Health Report</h1>
            
            {/* High-level summary overview */}
            <MentalHealthSummary
              userName={userName}
              date="March 15, 2025"
              summaryItems={summaryItems}
            />
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Journal Entries</h2>
              
              {journalEntries.slice(0, 2).map((entry, index) => (
                <JournalEntry
                  key={index}
                  date={entry.date}
                  timestamp={entry.timestamp}
                  title={entry.title}
                  content={entry.content}
                  highlight={entry.highlight}
                  expanded={entry.expanded}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FollowupReport;
