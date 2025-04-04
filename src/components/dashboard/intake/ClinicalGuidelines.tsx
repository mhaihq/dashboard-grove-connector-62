
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Heart, Brain, Clipboard, Book } from 'lucide-react';

interface MedicareProgram {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  icon: 'shield' | 'heart' | 'brain' | 'clipboard' | 'book';
  badgeText: string;
  badgeVariant: 'outline' | 'default' | 'secondary';
}

interface ClinicalGuidelinesProps {
  medicarePrograms: MedicareProgram[];
}

export const ClinicalGuidelines: React.FC<ClinicalGuidelinesProps> = ({ 
  medicarePrograms 
}) => {
  const getIcon = (iconType: MedicareProgram['icon']) => {
    switch (iconType) {
      case 'shield':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'heart':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'brain':
        return <Brain className="h-5 w-5 text-purple-500" />;
      case 'clipboard':
        return <Clipboard className="h-5 w-5 text-green-500" />;
      case 'book':
        return <Book className="h-5 w-5 text-amber-500" />;
      default:
        return <Shield className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        {medicarePrograms.map((program) => (
          <Card key={program.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-blue-50 rounded-full">
                    {getIcon(program.icon)}
                  </div>
                  <CardTitle className="text-lg font-medium">{program.title}</CardTitle>
                </div>
                <Badge variant={program.badgeVariant} className="ml-2">
                  {program.badgeText}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm mb-4">
                {program.description}
              </CardDescription>
              <div className="text-xs text-gray-500 mb-4">
                <span className="font-medium">Eligibility:</span> {program.eligibility}
              </div>
              <Button size="sm" className="w-full">
                Discuss Eligibility
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClinicalGuidelines;
