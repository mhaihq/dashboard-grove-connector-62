
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import AssessmentOverview from '@/components/AssessmentOverview';

const IntakeReport = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName="Alex Smith" userEmail="alex@example.com" />
      
      <main className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Initial Assessment</h1>
        
        <AssessmentOverview userName="Alex" />
      </main>
    </div>
  );
};

export default IntakeReport;
