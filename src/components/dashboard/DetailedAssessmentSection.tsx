
import React from 'react';
import { ClipboardList, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentOverview } from '@/components/AssessmentOverview';
import { UpcomingActions } from '@/components/UpcomingActions';

interface Action {
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

interface DetailedAssessmentSectionProps {
  userName: string;
  upcomingActions: Action[];
}

export const DetailedAssessmentSection: React.FC<DetailedAssessmentSectionProps> = ({
  userName,
  upcomingActions
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Assessment Overview */}
      <Card className="lg:col-span-2 text-left shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2 pt-5">
          <CardTitle className="flex items-center text-xl">
            <ClipboardList className="w-5 h-5 text-hana-green mr-2" />
            Let's Talk About Your Health
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1">
            Here's what I've noticed and how we can support you
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-3 pb-4">
          <AssessmentOverview userName={userName} />
        </CardContent>
        <CardFooter className="text-left pb-5">
          <button className="text-hana-green hover:text-green-700 text-sm font-medium flex items-center">
            See your full health story
          </button>
        </CardFooter>
      </Card>
      
      {/* Next Steps/Actions */}
      <Card className="text-left shadow-sm hover:shadow-md transition-shadow h-full">
        <CardHeader className="pb-2 pt-5">
          <CardTitle className="flex items-center text-xl">
            <Calendar className="w-5 h-5 text-hana-green mr-2" />
            Small Steps Forward
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1">
            Little actions that can make a big difference
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-3 pb-4">
          <UpcomingActions actions={upcomingActions} />
        </CardContent>
        <CardFooter className="text-left pb-5">
          <button className="text-hana-green hover:text-green-700 text-sm font-medium flex items-center">
            See all your personalized suggestions
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DetailedAssessmentSection;
