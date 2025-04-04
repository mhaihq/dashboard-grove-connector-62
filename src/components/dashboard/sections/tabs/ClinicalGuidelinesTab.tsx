
import React from 'react';
import { ChevronRight, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clinicalRecommendations } from '@/data/recommendations/clinicalRecommendations';
import { medicarePrograms } from '@/data/medicare/programsData';
import ClinicalGuidelineCard from '../cards/ClinicalGuidelineCard';
import { useNavigate } from 'react-router-dom';

interface ClinicalGuidelinesTabProps {
  onScheduleCall: () => void;
}

const ClinicalGuidelinesTab: React.FC<ClinicalGuidelinesTabProps> = ({ onScheduleCall }) => {
  const navigate = useNavigate();

  const handleSeeDetails = () => {
    // Redirect to home page with clinical guidelines section in focus
    navigate('/', { state: { section: 'clinical-guidelines' } });
    // This will be handled by the App component to open the sidebar and navigate to the section
    document.dispatchEvent(new CustomEvent('open-clinical-guidelines'));
  };

  return (
    <>
      <div className="mb-6">
        <div className="mb-2 flex flex-col">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Clinical Guidelines</h3>
          <p className="text-sm text-gray-600 mb-4">
            Based on your health profile, these specialized interventions may be beneficial
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {clinicalRecommendations.slice(0, 2).map((recommendation, index) => (
            <ClinicalGuidelineCard key={index} recommendation={recommendation} simplified={true} />
          ))}
        </div>
        
        <div className="flex justify-center mt-4">
          <Button onClick={handleSeeDetails} variant="outline" className="flex items-center gap-1">
            See Details <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="mb-2 flex flex-col">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Medicare Care Programs</h3>
          <p className="text-sm text-gray-600 mb-4">
            These programs offer coordinated care services to help manage your conditions effectively
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {medicarePrograms.slice(0, 2).map((program, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="bg-blue-50 p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">{program.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm">{program.shortDescription || program.description.substring(0, 100) + '...'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClinicalGuidelinesTab;
