
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import JournalEntry from '@/components/JournalEntry';

const FollowupReport = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName="Alex Smith" userEmail="alex@example.com" />
      
      <main className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Follow-up Report</h1>
        
        <JournalEntry
          date="March 15, 2025"
          timestamp="2:30 PM"
          title="Weekly Check-in"
          content="Had a great week overall. Energy levels are improving, and I've been consistent with my evening walks. Still struggling a bit with sleep quality, but the relaxation techniques are helping somewhat."
          highlight="Your progress with physical activity is excellent! Let's focus on improving your sleep routine next week."
          expanded={true}
        />
      </main>
    </div>
  );
};

export default FollowupReport;
