
import React from 'react';
import { Button } from '@/components/ui/button';
import { InfoIcon, HelpCircle, MessageCircle } from 'lucide-react';
import { medicarePrograms } from '@/data/medicare/programsData';
import ClinicalGuidelineCard from '@/components/dashboard/sections/cards/ClinicalGuidelineCard';

interface ClinicalGuidelinesProps {
  onScheduleCall: () => void;
}

export const ClinicalGuidelines: React.FC<ClinicalGuidelinesProps> = ({ onScheduleCall }) => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Clinical Guidelines</h1>
        <p className="text-gray-600">
          Medicare-approved care management programs and interventions tailored to your health profile.
        </p>
      </div>
      
      <div className="mb-5 bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-blue-800 font-medium">About Medicare programs</p>
          <p className="text-sm text-blue-700">
            Based on your health profile, you may be eligible for these Medicare programs that provide additional support. Eligibility is determined by your healthcare provider.
          </p>
        </div>
      </div>
      
      <div className="space-y-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Medicare Care Management Programs</h3>
        <p className="text-sm text-gray-600 mb-4">
          These programs offer coordinated care services that could help manage your conditions more effectively:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicarePrograms.map((program, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white">
              <div className="flex items-center bg-blue-50 p-4 border-b border-gray-200">
                <div className="bg-white p-2.5 rounded-full mr-3 shadow-sm text-blue-600 flex items-center justify-center w-10 h-10">
                  {program.icon === 'brain' && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2l-2 2.5-3 1-1 2v2l2 3 1.5 2" /><path d="M7.5 22c1-1.5 2.5-3 4.5-3s3.5 1.5 4.5 3" /><path d="m13 5 2 2.5 3 1 1.5 2v2l-2 3-1.5 2" /><path d="M9 14c.33-.67.67-1 1-1" /><path d="M14 14c-.33-.67-.67-1-1-1" /><path d="M12 16v5" /><path d="M14 19h-4" /></svg>}
                  {program.icon === 'shield' && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>}
                  {program.icon === 'clipboard' && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" /></svg>}
                  {program.icon === 'book' && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{program.name}</h3>
                  <p className="text-sm text-gray-600">{program.originalName}</p>
                </div>
              </div>
              
              <div className="p-5">
                <div className="mb-5">
                  <p className="text-gray-700 mb-4 leading-relaxed">{program.description}</p>
                  
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-5">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Coverage includes:</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">{program.coverage}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2.5">Benefits:</h4>
                    <ul className="space-y-2 pl-5 list-disc">
                      {program.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-700">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-5">
                    <h4 className="text-sm font-medium text-gray-900 mb-1.5">Eligibility criteria:</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{program.eligibility}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={onScheduleCall}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Discuss Eligibility
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
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
          <li><span className="font-medium text-purple-600">Principal Care Management (PCM)</span>: For focused management of a single condition</li>
          <li><span className="font-medium text-amber-600">Advanced Primary Care Management (APCM)</span>: For comprehensive primary care support</li>
        </ul>
        <p className="text-sm text-gray-600 mb-3">
          Your physician can help determine your specific eligibility and refer you to specialist care if needed.
        </p>
        <Button 
          onClick={onScheduleCall} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Discuss Eligibility
        </Button>
      </div>
    </div>
  );
};

export default ClinicalGuidelines;
