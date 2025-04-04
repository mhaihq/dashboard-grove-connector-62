
import React from 'react';
import { ClinicalGuidelines } from '@/components/dashboard/intake';
import { useNavigate } from 'react-router-dom';

const ClinicalGuidelinesPage = () => {
  const navigate = useNavigate();
  
  const handleScheduleCall = () => {
    navigate('/schedule-followup');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <ClinicalGuidelines onScheduleCall={handleScheduleCall} />
    </div>
  );
};

export default ClinicalGuidelinesPage;
