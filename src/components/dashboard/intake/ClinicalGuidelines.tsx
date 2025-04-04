
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface MedicareProgram {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  icon: 'shield' | 'heart' | 'brain' | 'clipboard' | 'book';
  badgeText: string;
  badgeVariant: 'outline' | 'default' | 'secondary';
  benefits?: string[];
  coverageDetails?: string;
  originalName?: string;
  isEligible?: boolean;
}

interface MedicareJourneyItem {
  program: string;
  color: string;
  description: string;
}

interface ClinicalGuidelinesProps {
  medicarePrograms?: MedicareProgram[];
  journeyItems?: MedicareJourneyItem[];
  onScheduleCall?: () => void;
}

export const ClinicalGuidelines: React.FC<ClinicalGuidelinesProps> = ({ 
  medicarePrograms = [],
  journeyItems = [],
  onScheduleCall
}) => {
  return (
    <div className="w-full space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">Medicare Care Management Programs</h2>
        <p className="text-gray-600 mb-6">
          These programs offer coordinated care services that could help manage your conditions more effectively:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {medicarePrograms.map((program) => (
            <Card key={program.id} className="overflow-hidden border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                      {program.icon === 'shield' && <div className="text-blue-600 text-2xl">⊕</div>}
                      {program.icon === 'heart' && <div className="text-blue-600 text-2xl">♡</div>}
                      {program.icon === 'brain' && <div className="text-blue-600 text-2xl">⚕</div>}
                      {program.icon === 'clipboard' && <div className="text-blue-600 text-2xl">✎</div>}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{program.title}</h3>
                      {program.originalName && (
                        <p className="text-sm text-gray-500">{program.originalName}</p>
                      )}
                    </div>
                  </div>
                  {program.isEligible !== undefined && (
                    <Badge 
                      variant="outline" 
                      className={`flex items-center ${program.isEligible ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
                    >
                      {program.isEligible && <CheckCircle className="h-3.5 w-3.5 mr-1" />}
                      {program.isEligible ? 'Eligible' : 'Check Eligibility'}
                    </Badge>
                  )}
                </div>
                
                <p className="text-gray-700 mb-4">{program.description}</p>
                
                {program.benefits && program.benefits.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-sm font-medium mb-2">Program Benefits:</h4>
                    <ul className="space-y-2 pl-5 list-disc">
                      {program.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-700">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {program.coverageDetails && (
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-5">
                    <h4 className="text-sm font-medium text-blue-900 mb-1">Coverage Details:</h4>
                    <p className="text-sm text-blue-800">{program.coverageDetails}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-gray-500">Medicare Part B</div>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={onScheduleCall}
                  >
                    Discuss Eligibility
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {journeyItems.length > 0 && (
        <div className="border border-green-200 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600 text-xl">ⓘ</span>
            </div>
            <h2 className="text-xl font-bold">Your Medicare Care Journey</h2>
          </div>
          
          <p className="text-gray-600 mb-4">Based on your Medicare coverage, you may be eligible for these programs:</p>
          
          <ul className="space-y-3 mb-5">
            {journeyItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className={`text-${item.color}-600 mr-2`}>•</span>
                <div>
                  <span className={`font-medium text-${item.color}-600`}>{item.program}</span>
                  <span className="text-gray-700">: {item.description}</span>
                </div>
              </li>
            ))}
          </ul>
          
          <p className="text-gray-700 mb-5">Your physician can help determine your specific eligibility and refer you to specialist care if needed.</p>
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={onScheduleCall}
          >
            Discuss With Your Health Coach
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClinicalGuidelines;
