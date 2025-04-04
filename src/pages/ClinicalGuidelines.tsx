
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import ClinicalGuidelinesTab from '@/components/dashboard/ClinicalGuidelinesTab';

const ClinicalGuidelines = () => {
  const recommendations = [
    {
      title: "Annual Wellness Visit",
      description: "Schedule your yearly Medicare wellness visit",
      rationale: "Important for preventive care and early detection",
      priority: "high" as const,
      benefits: ["Comprehensive health assessment", "Preventive screenings", "No cost with Medicare Part B"],
      source: "Medicare Guidelines",
      timeframe: "Within 1 month",
      status: "not-started"
    }
  ];

  const medicarePrograms = [
    {
      name: "Chronic Care Management",
      originalName: "Medicare CCM Program",
      description: "Comprehensive care coordination for patients with multiple chronic conditions",
      icon: "clipboard",
      benefits: ["24/7 access to care support", "Personalized care plan", "Medication management"],
      coverage: "Monthly check-ins, care coordination, and support services",
      eligibility: "Must have two or more chronic conditions expected to last at least 12 months",
      isEligible: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName="Alex Smith" userEmail="alex@example.com" />
      
      <main className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Clinical Guidelines</h1>
        
        <ClinicalGuidelinesTab 
          recommendations={recommendations}
          medicarePrograms={medicarePrograms}
          onRecommendationAction={() => console.log("Action triggered")}
          onSwitchTab={() => console.log("Tab switched")}
        />
      </main>
    </div>
  );
};

export default ClinicalGuidelines;
