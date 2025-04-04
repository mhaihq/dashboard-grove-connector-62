
import React from 'react';
import { MedicareProgram } from '@/types/dashboard';
import ClinicalRecommendationCard from './ClinicalRecommendationCard';

interface MedicareProgramsProps {
  programs: MedicareProgram[];
}

export const MedicarePrograms: React.FC<MedicareProgramsProps> = ({ programs }) => {
  return (
    <div className="mb-8">
      <h3 className="text-base font-medium text-gray-900 mb-3">Medicare Preventive & Support Programs</h3>
      <div className="space-y-6">
        {programs.map((program, index) => (
          <ClinicalRecommendationCard 
            key={index} 
            program={program} 
            onAction={() => console.log(`Action for ${program.name}`)} 
          />
        ))}
      </div>
    </div>
  );
};

export default MedicarePrograms;
