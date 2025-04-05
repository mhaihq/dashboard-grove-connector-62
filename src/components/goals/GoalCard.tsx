
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormattedGoal } from '@/types/goals';

interface GoalCardProps {
  goal: FormattedGoal;
}

export const GoalCard = ({ goal }: GoalCardProps) => {
  const progressPercentage = Math.round((goal.progress / goal.target) * 100);
  const currentStreak = goal.current_streak || 0;
  
  // Helper function to map duration_type to UI term
  const getDurationLabel = (durationType: string) => {
    switch(durationType) {
      case 'SHORT': return 'Short Term';
      case 'MEDIUM': return 'Medium Term';
      case 'LONG': return 'Long Term';
      default: return 'Unknown';
    }
  };

  // Helper function to map status to UI badge color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ACTIVE': return 'bg-positive-light text-positive';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      case 'CANCELLED': return 'bg-gray-100 text-gray-800';
      case 'OVERDUE': return 'bg-concerning-light text-concerning';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Format dates to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Get appropriate category icon
  const getCategoryIcon = () => {
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {currentStreak > 0 && (
        <div className="absolute top-0 left-0">
          <div className="bg-amber-100 text-amber-800 py-1 px-3 transform rotate-[-45deg] translate-x-[-25%] translate-y-[-25%] shadow-sm flex items-center">
            <Trophy className="w-3.5 h-3.5 text-amber-500 mr-1" />
            <span className="text-xs font-medium">{currentStreak} day streak</span>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2 leading-tight">
            {goal.title}
          </CardTitle>
          <Badge 
            variant={goal.origin === 'HANA' ? 'secondary' : 'outline'}
            className={cn(
              goal.origin === 'HANA' ? 'bg-hana-blue text-blue-700 hover:bg-blue-200 border-0' : 'border-gray-200'
            )}
          >
            {goal.source}
          </Badge>
        </div>
        <div className="flex gap-2 mt-2">
          <Badge variant="outline" className={cn(getStatusColor(goal.status))}>
            {goal.status}
          </Badge>
          <Badge variant="outline" className="bg-hana-yellow text-amber-800 border-0">
            {getDurationLabel(goal.duration_type)}
          </Badge>
          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 flex items-center">
            {getCategoryIcon()}
            {goal.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Overall Progress */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm text-gray-600">
              {goal.progress} / {goal.target}
            </div>
            <div 
              className={cn(
                "text-sm font-medium",
                progressPercentage < 25 ? "text-concerning" :
                progressPercentage < 75 ? "text-mixed" : "text-positive"
              )}
            >
              {progressPercentage}%
            </div>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2"
          />
        </div>
        
        <div className="mt-4">
          <div className="text-sm flex items-center text-gray-600 mb-1 bg-gray-50 rounded-lg p-2 border border-gray-100">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            <div>
              <span className="font-medium text-gray-700">Duration: </span>
              {formatDate(goal.start_date)} - {formatDate(goal.end_date)}
            </div>
          </div>
          
          {goal.description && (
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">
              {goal.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
