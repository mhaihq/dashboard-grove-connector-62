
import React from 'react';
import { Activity, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthAssessmentChart } from '@/components/HealthAssessmentChart';
import { EligibilityStatus } from '@/components/EligibilityStatus';

interface AssessmentData {
  area: string;
  score: number;
}

interface EligibilityProgram {
  program: string;
  eligible: boolean | string;
  reason: string;
}

interface HealthAssessmentSectionProps {
  assessmentData: AssessmentData[];
  eligibilityData: EligibilityProgram[];
}

export const HealthAssessmentSection: React.FC<HealthAssessmentSectionProps> = ({
  assessmentData,
  eligibilityData
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
      {/* Health Assessment Chart */}
      <Card className="lg:col-span-2 text-left shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-0 pt-3">
          <CardTitle className="flex items-center text-xl">
            <Activity className="w-5 h-5 text-hana-green mr-2" />
            Your Health Snapshot
          </CardTitle>
          <CardDescription className="text-gray-600">
            Here's what we're seeing across different areas of your wellbeing
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-3">
          <div className="p-0">
            <HealthAssessmentChart data={assessmentData} />
          </div>
        </CardContent>
      </Card>
      
      {/* Medicare Program Eligibility */}
      <Card className="text-left shadow-md hover:shadow-lg transition-shadow h-full">
        <CardHeader className="pb-0 pt-3">
          <CardTitle className="flex items-center text-xl">
            <Award className="w-5 h-5 text-hana-green mr-2" />
            Programs You Qualify For
          </CardTitle>
          <CardDescription className="text-gray-600">
            These programs can help support your health journey
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-3">
          <EligibilityStatus programs={eligibilityData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAssessmentSection;
