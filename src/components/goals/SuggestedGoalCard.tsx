
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, X, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormattedGoal } from '@/types/goals';

interface SuggestedGoalCardProps {
  goal: Partial<FormattedGoal>;
  onAdopt: (goal: Partial<FormattedGoal>) => void;
  onDismiss: (goalId: number) => void;
}

export const SuggestedGoalCard = ({ goal, onAdopt, onDismiss }: SuggestedGoalCardProps) => {
  // Helper function to map duration_type to UI term
  const getDurationLabel = (durationType: string) => {
    switch(durationType) {
      case 'SHORT': return 'Short Term';
      case 'MEDIUM': return 'Medium Term';
      case 'LONG': return 'Long Term';
      default: return 'Unknown';
    }
  };

  // Get appropriate category icon
  const getCategoryIcon = () => {
    if (!goal.category) return <Target className="w-4 h-4 mr-1" />;
    
    switch(goal.category) {
      case 'Lifestyle': return <Target className="w-4 h-4 mr-1" />;
      case 'Physical Health': return <Trophy className="w-4 h-4 mr-1" />;
      case 'Therapy': return <Target className="w-4 h-4 mr-1" />;
      case 'Medication': return <Target className="w-4 h-4 mr-1" />;
      case 'Social': return <Target className="w-4 h-4 mr-1" />;
      case 'Coping Skills': return <Target className="w-4 h-4 mr-1" />;
      default: return <Target className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <Card className="overflow-hidden border-amber-200 bg-amber-50/40 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-amber-900">{goal.title}</h3>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-7 w-7 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            onClick={() => onDismiss(goal.id!)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
        
        <p className="text-sm text-amber-800 mt-1 mb-3">{goal.description}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className="bg-hana-yellow text-amber-800 border-0">
            {getDurationLabel(goal.duration_type || 'SHORT')}
          </Badge>
          {goal.category && (
            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 flex items-center">
              {getCategoryIcon()}
              {goal.category}
            </Badge>
          )}
          <span className="text-xs text-amber-700">Target: {goal.target} actions</span>
        </div>
        
        <Button 
          variant="outline"
          className="w-full mt-4 border-amber-300 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
          onClick={() => onAdopt(goal)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add to My Goals
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuggestedGoalCard;
