
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trophy, Check, Calendar } from 'lucide-react';

// Updated sample data to match the new schema
const sampleGoals = [
  {
    id: 1,
    user_id: 1,
    title: "Practice Mindfulness Daily",
    duration_type: "SHORT",
    start_date: "2025-04-01",
    end_date: "2025-04-14",
    target: 7,
    progress: 5,
    description: "Practice mindfulness meditation for at least 10 minutes each day",
    origin: "HANA",
    status: "ACTIVE",
    created_at: "2025-04-01T00:00:00Z",
    updated_at: "2025-04-07T00:00:00Z",
    // Added for UI compatibility
    category: "Lifestyle",
    source: "Hana Suggested",
    difficulty: "hard" as const,
    term: "short term" as const,
    // Added streak information
    currentWeeklyStreak: 3,
    longestStreak: 5,
    thisWeekProgress: 3,
    weeklyTarget: 4
  },
  {
    id: 2,
    user_id: 1,
    title: "Maintain Regular Sleep Schedule",
    duration_type: "MEDIUM",
    start_date: "2025-03-25",
    end_date: "2025-04-25",
    target: 8,
    progress: 6,
    description: "Go to bed and wake up at consistent times to achieve 8 hours of sleep",
    origin: "PATIENT",
    status: "ACTIVE",
    created_at: "2025-03-25T00:00:00Z",
    updated_at: "2025-04-10T00:00:00Z",
    // Added for UI compatibility
    category: "Lifestyle",
    source: "Personal",
    difficulty: "hard" as const,
    term: "medium term" as const,
    // Added streak information
    currentWeeklyStreak: 6,
    longestStreak: 7,
    thisWeekProgress: 5,
    weeklyTarget: 7
  },
  {
    id: 3,
    user_id: 1,
    title: "Go to the Gym 2 times each week",
    duration_type: "SHORT",
    start_date: "2025-04-01",
    end_date: "2025-04-14",
    target: 4,
    progress: 2,
    description: "Visit the gym and complete a full workout session twice weekly",
    origin: "PATIENT",
    status: "ACTIVE",
    created_at: "2025-04-01T00:00:00Z",
    updated_at: "2025-04-07T00:00:00Z",
    // Added for UI compatibility
    category: "Physical Health",
    source: "Personal",
    difficulty: "hard" as const,
    term: "short term" as const,
    // Added streak information
    currentWeeklyStreak: 2,
    longestStreak: 2,
    thisWeekProgress: 1,
    weeklyTarget: 2
  },
  {
    id: 4,
    user_id: 1,
    title: "Weekly Social Connection",
    duration_type: "LONG",
    start_date: "2025-04-01",
    end_date: "2025-06-01",
    target: 8,
    progress: 0,
    description: "Schedule at least one meaningful social interaction per week",
    origin: "HANA",
    status: "ACTIVE",
    created_at: "2025-04-01T00:00:00Z",
    updated_at: "2025-04-01T00:00:00Z",
    // Added for UI compatibility
    category: "Social",
    source: "Hana Suggested",
    difficulty: "hard" as const,
    term: "medium term" as const,
    // Added streak information
    currentWeeklyStreak: 0,
    longestStreak: 0,
    thisWeekProgress: 0,
    weeklyTarget: 1
  }
];

// Updated categories to match our sample data
const goalCategories = [
  "All Goals",
  "Lifestyle",
  "Physical Health",
  "Social",
  "Coping Skills",
  "Medication",
  "Therapy"
];

const Goals = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Goals");
  
  const filteredGoals = selectedCategory === "All Goals" 
    ? sampleGoals 
    : sampleGoals.filter(goal => goal.category === selectedCategory);
  
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
                    {goal.origin === 'HANA' ? 'Hana Suggested' : 'Personal'}
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
                {/* Weekly Streak Information */}
                <div className="mb-4 border rounded-lg p-3 bg-amber-50">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 text-amber-500 mr-1" />
                      <span className="text-sm font-medium text-amber-800">Weekly Progress</span>
                    </div>
                    <div className="flex items-center">
                      <Badge 
                        variant="outline" 
                        className="bg-amber-100 text-amber-800 border-amber-200"
                      >
                        {goal.currentWeeklyStreak} day streak
                      </Badge>
                    </div>
                  </div>
                  
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
                  
                  <div className="flex justify-between items-center mt-2 text-xs text-amber-800">
                    <div>Longest streak: {goal.longestStreak} days</div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-amber-500" />
                      <span>Weekly target: {goal.weeklyTarget}</span>
                    </div>
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
