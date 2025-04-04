
import React from 'react';
import { InfoIcon, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clinicalRecommendations } from '@/data/recommendations/clinicalRecommendations';
import { medicarePrograms } from '@/data/medicare/programsData';
import { useNavigate } from 'react-router-dom';
import MedicareProgramCard from '../cards/MedicareProgramCard';

interface ClinicalGuidelinesTabProps {
  onScheduleCall: () => void;
}

const ClinicalGuidelinesTab: React.FC<ClinicalGuidelinesTabProps> = ({ onScheduleCall }) => {
  const navigate = useNavigate();
  
  const goToDetailedView = () => {
    navigate('/clinical-guidelines');
  };

  return (
    <>
      <div className="mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-blue-800 font-medium">About Medicare programs</p>
          <p className="text-sm text-blue-700">
            Based on your health profile, you may be eligible for these Medicare programs that provide additional support.
          </p>
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Medicare Care Management Programs</h3>
        <p className="text-sm text-gray-600 mb-4">
          These programs offer coordinated care services that could help manage your conditions more effectively:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medicarePrograms.slice(0, 2).map((program, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
              <h3 className="text-base font-medium text-gray-900 mb-1">{program.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{program.originalName}</p>
              <p className="text-sm text-gray-700 mb-2 line-clamp-2">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Button 
          onClick={goToDetailedView} 
          variant="default" 
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          See All Clinical Guidelines <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <InfoIcon className="h-5 w-5 text-blue-500" />
          <h3 className="text-base font-medium">Your Medicare Care Journey</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Based on your Medicare coverage, you may be eligible for these programs:
        </p>
        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5 mb-3">
          <li><span className="font-medium text-blue-600">Chronic Care Management (CCM)</span>: For managing multiple chronic conditions</li>
          <li><span className="font-medium text-green-600">Behavioral Health Integration (BHI)</span>: For coordinating mental health care</li>
        </ul>
        <Button onClick={goToDetailedView} variant="secondary" size="sm" className="w-full">
          Discuss Eligibility
        </Button>
      </div>
    </>
  );
};

export default ClinicalGuidelinesTab;
