
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trophy, Check, Calendar } from 'lucide-react';
import { formattedGoals } from '@/data/goals/goalsData';
import { goalCategories } from '@/data/goals/goalsData';

const Goals = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Goals");
  
  const filteredGoals = selectedCategory === "All Goals" 
    ? formattedGoals 
    : formattedGoals.filter(goal => goal.category === selectedCategory);
  
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
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      case 'CANCELLED': return 'bg-gray-100 text-gray-800';
      case 'OVERDUE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Goals</h1>
        <Button className="bg-hana-green hover:bg-hana-green/90 text-white">
          Add New Goal
        </Button>
      </div>
      
      <div className="flex gap-2 mb-6 flex-wrap">
        {goalCategories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-hana-green hover:bg-hana-green/90" : ""}
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGoals.map(goal => {
          const progressPercentage = Math.round((goal.progress / goal.target) * 100);
          const weeklyProgressPercentage = Math.round((goal.thisWeekProgress / goal.weeklyTarget) * 100) || 0;
          const currentStreak = goal.currentWeeklyStreak || 0;
          const longestStreak = goal.longest_streak || 0;
          const lastCheckIn = goal.last_check_in_date ? new Date(goal.last_check_in_date).toLocaleDateString() : "No check-ins yet";
          
          return (
            <Card key={goal.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold line-clamp-2 leading-tight">
                    {goal.title}
                  </CardTitle>
                  <Badge 
                    variant={goal.origin === 'HANA' ? 'secondary' : 'outline'}
                    className={cn(
                      goal.origin === 'HANA' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 'border-gray-200'
                    )}
                  >
                    {goal.source}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className={cn(getStatusColor(goal.status))}>
                    {goal.status}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800">
                    {getDurationLabel(goal.duration_type)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Streak Information */}
                <div className="mb-4 border rounded-lg p-3 bg-amber-50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 text-amber-500 mr-1" />
                      <span className="text-sm font-medium text-amber-800">Streak Information</span>
                    </div>
                    <div className="flex items-center">
                      <Badge 
                        variant="outline" 
                        className="bg-amber-100 text-amber-800 border-amber-200"
                      >
                        {currentStreak} day streak
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-xs text-amber-800 border-r border-amber-200 pr-2">
                      <span className="font-medium">Current Streak:</span> {currentStreak} days
                    </div>
                    <div className="text-xs text-amber-800 pl-2">
                      <span className="font-medium">Longest Streak:</span> {longestStreak} days
                    </div>
                    <div className="text-xs text-amber-800 border-r border-amber-200 pr-2">
                      <span className="font-medium">Weekly Target:</span> {goal.weeklyTarget} actions
                    </div>
                    <div className="text-xs text-amber-800 pl-2">
                      <span className="font-medium">Last Check-in:</span> {lastCheckIn}
                    </div>
                  </div>
                  
                  {/* Weekly Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between items-center mt-2 mb-1">
                      <div className="text-xs text-amber-800">
                        {goal.thisWeekProgress} / {goal.weeklyTarget} this week
                      </div>
                      <div className="text-xs font-medium text-amber-800">
                        {weeklyProgressPercentage}%
                      </div>
                    </div>
                    <Progress 
                      value={weeklyProgressPercentage} 
                      className="h-1.5 bg-amber-200"
                    />
                  </div>
                </div>

                {/* Overall Progress */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-sm text-gray-600">
                      Overall: {goal.progress} / {goal.target}
                    </div>
                    <div 
                      className={cn(
                        "text-sm font-medium",
                        progressPercentage < 25 ? "text-red-600" :
                        progressPercentage < 75 ? "text-amber-600" : "text-green-600"
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
                  <div className="text-sm text-gray-600 mb-1">
                    {new Date(goal.start_date).toLocaleDateString()} - {new Date(goal.end_date).toLocaleDateString()}
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
        })}
      </div>
      
      {filteredGoals.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">No goals found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Goals;
