
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';

const Goals = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName="Alex Smith" userEmail="alex@example.com" />
      
      <main className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Health Goals</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-700">Set and track your health goals here.</p>
        </div>
      </main>
    </div>
  );
};

export default Goals;
