
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import HealthMetrics from '@/components/HealthMetrics';

const Index = () => {
  const metrics = [
    { title: 'Blood Pressure', value: '123/78', status: 'positive', trend: 'down', trendValue: '4%' },
    { title: 'Heart Rate', value: '72 bpm', status: 'neutral' },
    { title: 'Sleep Quality', value: '6.2h', status: 'warning', trend: 'down', trendValue: '8%' },
    { title: 'Physical Activity', value: '35 min', status: 'positive', trend: 'up', trendValue: '10%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName="Alex Smith" userEmail="alex@example.com" />
      
      <main className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome to Hana Health</h1>
        
        <HealthMetrics metrics={metrics} />
      </main>
    </div>
  );
};

export default Index;
