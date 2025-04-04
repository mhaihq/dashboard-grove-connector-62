
import React from 'react';
import { ClinicalGuidelines } from '@/components/dashboard/intake';
import { useNavigate } from 'react-router-dom';

// Sample Medicare Programs data with enhanced details
const medicareProgramsData = [
  {
    id: "program1",
    title: "Care Coordination Support",
    originalName: "Chronic Care Management (CCM)",
    description: "Ongoing support for chronic conditions with regular monitoring and care coordination.",
    eligibility: "Medicare beneficiaries with 2+ chronic conditions expected to last at least 12 months.",
    icon: "shield" as const,
    badgeText: "Preventive Care",
    badgeVariant: "outline" as const,
    isEligible: true,
    benefits: [
      "24/7 access to healthcare providers for urgent care needs",
      "Regular review of medications to prevent interactions",
      "Coordination between all your healthcare providers",
      "Personalized care plan that's regularly updated"
    ],
    coverageDetails: "Medicare Part B covers 80% of the approved amount after you've met your Part B deductible."
  },
  {
    id: "program2",
    title: "Home Health Monitoring",
    originalName: "Remote Patient Monitoring (RPM)",
    description: "Track health metrics from home with devices that send data to your healthcare provider.",
    eligibility: "Medicare beneficiaries whose providers have ordered RPM services.",
    icon: "heart" as const,
    badgeText: "Remote Care",
    badgeVariant: "default" as const,
    isEligible: true,
    benefits: [
      "Reduce need for in-person visits",
      "Early detection of health issues",
      "More consistent monitoring of vital signs",
      "Real-time alerts for concerning measurements"
    ],
    coverageDetails: "Medicare Part B covers RPM services for patients with acute and chronic conditions."
  },
  {
    id: "program3",
    title: "Mental Health Integration",
    originalName: "Behavioral Health Integration (BHI)",
    description: "Mental health services integrated with your primary care.",
    eligibility: "Medicare beneficiaries with behavioral health conditions like depression or anxiety.",
    icon: "brain" as const,
    badgeText: "Mental Health",
    badgeVariant: "secondary" as const,
    isEligible: false,
    benefits: [
      "Regular assessment of your condition",
      "Care planning for behavioral health needs",
      "Brief interventions using evidence-based techniques",
      "Monitoring your progress with regular follow-ups"
    ],
    coverageDetails: "Medicare Part B covers BHI services when provided by eligible professionals."
  },
  {
    id: "program4",
    title: "Focused Condition Support",
    originalName: "Principal Care Management (PCM)",
    description: "Focused care management for a single high-risk condition.",
    eligibility: "Medicare beneficiaries with one complex chronic condition that's expected to last at least 3 months.",
    icon: "clipboard" as const,
    badgeText: "Specialized Care",
    badgeVariant: "default" as const,
    isEligible: false,
    benefits: [
      "Dedicated focus on your most serious health concern",
      "Development of a disease-specific care plan",
      "Medication management for your condition",
      "Coordination with specialists for your condition"
    ],
    coverageDetails: "Medicare Part B covers PCM services when provided by eligible professionals."
  }
];

// Sample Medicare Journey items
const medicareJourneyItems = [
  {
    program: "Chronic Care Management (CCM)",
    color: "blue",
    description: "For managing multiple chronic conditions"
  },
  {
    program: "Behavioral Health Integration (BHI)",
    color: "green",
    description: "For coordinating mental health care"
  },
  {
    program: "Principal Care Management (PCM)",
    color: "purple",
    description: "For focused management of a single condition"
  },
  {
    program: "Advanced Primary Care Management (APCM)",
    color: "orange",
    description: "For comprehensive primary care support"
  }
];

const ClinicalGuidelinesPage = () => {
  const navigate = useNavigate();
  
  const handleScheduleCall = () => {
    navigate('/schedule-followup');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Clinical Guidelines & Medicare Programs</h1>
        <p className="text-gray-600 mb-8">
          Based on your health profile and Medicare eligibility, the following clinical programs and services 
          may be available to you. Review the details below and schedule a call to discuss your options.
        </p>
        <ClinicalGuidelines 
          medicarePrograms={medicareProgramsData} 
          journeyItems={medicareJourneyItems}
          onScheduleCall={handleScheduleCall} 
        />
      </div>
    </div>
  );
};

export default ClinicalGuidelinesPage;
