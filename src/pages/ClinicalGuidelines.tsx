
import React from 'react';
import { ClinicalGuidelines } from '@/components/dashboard/intake';
import { useNavigate } from 'react-router-dom';

// Sample Medicare Programs data
const medicareProgramsData = [
  {
    id: "program1",
    title: "Medicare Annual Wellness Visit",
    description: "A yearly appointment with your primary care provider to create or update a personalized prevention plan.",
    eligibility: "All Medicare Part B beneficiaries who have been enrolled for longer than 12 months",
    icon: "clipboard",
    badgeText: "Preventive Care",
    badgeVariant: "outline" as const
  },
  {
    id: "program2",
    title: "Chronic Care Management",
    description: "Continuous care coordination services for patients with multiple chronic conditions.",
    eligibility: "Medicare beneficiaries with two or more chronic conditions expected to last at least 12 months",
    icon: "heart",
    badgeText: "Chronic Care",
    badgeVariant: "default" as const
  },
  {
    id: "program3",
    title: "Medicare Diabetes Prevention Program",
    description: "A structured health behavior change program to prevent type 2 diabetes in at-risk individuals.",
    eligibility: "Medicare beneficiaries with prediabetes and specific BMI requirements",
    icon: "brain",
    badgeText: "Prevention",
    badgeVariant: "secondary" as const
  },
  {
    id: "program4",
    title: "Behavioral Health Integration",
    description: "Integrated care approach that incorporates mental health services into primary care settings.",
    eligibility: "Medicare beneficiaries diagnosed with a psychiatric disorder requiring behavioral health care",
    icon: "shield",
    badgeText: "Mental Health",
    badgeVariant: "default" as const
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
          may be available to you. Select any program to learn more or schedule a call to discuss your options.
        </p>
        <ClinicalGuidelines 
          medicarePrograms={medicareProgramsData} 
          onScheduleCall={handleScheduleCall} 
        />
      </div>
    </div>
  );
};

export default ClinicalGuidelinesPage;
