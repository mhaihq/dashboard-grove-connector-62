
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import CallTypeSelector from '@/components/CallTypeSelector';

const Intake = () => {
  const [selectedCallType, setSelectedCallType] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName="Alex Smith" userEmail="alex@example.com" />
      
      <main className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Initial Health Assessment</h1>
        
        <CallTypeSelector
          onSelect={setSelectedCallType}
          selectedType={selectedCallType}
        />
      </main>
    </div>
  );
};

export default Intake;
