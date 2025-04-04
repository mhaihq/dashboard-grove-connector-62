
import React from 'react';
import { Button } from '@/components/ui/button';
import { clinicalRecommendations } from '@/data/recommendations/clinicalRecommendations';
import { medicarePrograms } from '@/data/medicare/programsData';
import ClinicalGuidelineCard from '../sections/cards/ClinicalGuidelineCard';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Stethoscope, User, Calendar, Shield, HelpCircle } from 'lucide-react';

export const ClinicalGuidelines: React.FC = () => {
  return (
    <div className="py-6 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Stethoscope className="w-5 h-5 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-900">Clinical Guidelines</h1>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900 mb-1">About Clinical Guidelines</p>
            <p className="text-sm text-blue-800">
              These recommendations are based on clinical guidelines for your conditions. 
              Discuss with your healthcare provider to determine if these are right for you.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-3">Recommended Clinical Interventions</h2>
        <div className="space-y-4">
          {clinicalRecommendations.map((recommendation, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <ClinicalGuidelineCard recommendation={recommendation} />
              <div className="px-5 pb-5 pt-0 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Recommended Steps:</h4>
                <ol className="space-y-2 pl-5 list-decimal">
                  {recommendation.steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="text-sm text-gray-700">{step}</li>
                  ))}
                </ol>
                <div className="mt-4 flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    Discuss Eligibility
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-3">Medicare Care Programs</h2>
        <div className="space-y-4">
          {medicarePrograms.map((program, index) => (
            <Accordion key={index} type="single" collapsible className="border rounded-lg overflow-hidden mb-4">
              <AccordionItem value={`program-${index}`} className="border-none">
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center">
                    <span className="font-medium">{program.name}</span>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800`}>
                      Care Program
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <p className="text-sm text-gray-700 mb-3">{program.description}</p>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Benefits:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {program.benefits.map((benefit, benefitIdx) => (
                        <li key={benefitIdx} className="text-sm text-gray-700">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Eligibility:</h4>
                    <p className="text-sm text-gray-700">{program.eligibility}</p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                      Discuss Eligibility
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-blue-500" />
          <h3 className="text-base font-medium">Next Steps</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Your healthcare provider can help determine your eligibility for these programs and recommend
          the best approach for your specific health needs.
        </p>
        <Button variant="secondary" size="sm">
          Schedule Healthcare Consultation
        </Button>
      </div>
    </div>
  );
};
