
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  const handleScheduleCall = () => {
    window.location.href = '/schedule-followup';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard onScheduleCall={handleScheduleCall} />
    </div>
  );
};

export default Index;
