
import React from 'react';
import { Target, Award, Calendar, Check, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Goal {
  id: number;
  title: string;
  progress: number;
  target: number;
  category: string;
  difficulty: string;
  term: string;
  start_date: string;
  end_date: string;
  // Added fields for streak information
  currentWeeklyStreak?: number;
  longestStreak?: number;
  thisWeekProgress?: number;
  weeklyTarget?: number;
}

interface GoalStreakSectionProps {
  goals: Goal[];
}

const GoalStreakSection: React.FC<GoalStreakSectionProps> = ({ goals }) => {
  // Sort goals by progress percentage to highlight most completed goals
  const sortedGoals = [...goals].sort((a, b) => {
    const aProgress = (a.progress / a.target) * 100;
    const bProgress = (b.progress / b.target) * 100;
    return bProgress - aProgress;
  });

  // Take top 4 goals for the streak display
  const topGoals = sortedGoals.slice(0, 4);
  
  // Calculate overall streak stats
  const totalGoalsCompleted = goals.filter(g => g.progress >= g.target).length;
  const goalsInProgress = goals.filter(g => g.progress > 0 && g.progress < g.target).length;
  
  // Find goal with longest streak
  const longestStreakGoal = [...goals].sort((a, b) => 
    (b.longestStreak || 0) - (a.longestStreak || 0)
  )[0];
  const streakDays = longestStreakGoal?.longestStreak || 0;
  const streakGoalName = longestStreakGoal?.title || "No active streak";
  
  return (
    <Card className="shadow-sm overflow-hidden border-gray-200 bg-white rounded-xl">
      <CardHeader className="pb-2 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Award className="w-5 h-5 text-amber-500 mr-2" />
            <CardTitle className="text-lg font-medium text-gray-800">Goal Streaks</CardTitle>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 py-1 px-2 rounded-full">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-amber-700">{streakDays} Day Streak</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        {/* Stats summary at the top */}
        <div className="mb-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-green-50 rounded-lg p-2">
            <p className="text-xl text-green-700 font-bold">{totalGoalsCompleted}</p>
            <p className="text-xs text-gray-700">Completed</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <p className="text-xl text-blue-700 font-bold">{goalsInProgress}</p>
            <p className="text-xs text-gray-700">In Progress</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-2">
            <p className="text-xl text-amber-700 font-bold">{streakDays}</p>
            <p className="text-xs text-gray-700">
              <span className="inline-block truncate max-w-full">
                {streakDays > 0 ? "Longest Streak" : "No Streak"}
              </span>
            </p>
          </div>
        </div>
        
        {streakDays > 0 && (
          <div className="mb-4 p-3 border border-amber-200 bg-amber-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <p className="text-sm font-medium text-amber-800">
                Longest streak: <span className="font-semibold">{streakDays} days</span> on "{streakGoalName}"
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {topGoals.map((goal) => {
            const progressPercent = Math.round((goal.progress / goal.target) * 100);
            const daysLeft = Math.ceil((new Date(goal.end_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
            const currentStreak = goal.currentWeeklyStreak || 0;
            
            // Determine color based on progress
            const progressColor = progressPercent >= 75 ? 'bg-green-500' : 
                                 progressPercent >= 50 ? 'bg-amber-500' : 
                                 progressPercent >= 25 ? 'bg-orange-500' : 'bg-red-500';
                                 
            return (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm">{goal.title}</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Target className="w-3 h-3 mr-1" />
                      <span className="mr-2">{goal.category}</span>
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Due today'}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="relative w-8 h-8">
                            <svg className="w-8 h-8 transform -rotate-90">
                              <circle
                                cx="16"
                                cy="16"
                                r="14"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="3"
                              />
                              <circle
                                cx="16"
                                cy="16"
                                r="14"
                                fill="none"
                                stroke={progressPercent >= 75 ? '#22c55e' : 
                                        progressPercent >= 50 ? '#eab308' : 
                                        progressPercent >= 25 ? '#f97316' : '#ef4444'}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray={`${(Math.PI * 28) * (progressPercent / 100)} ${Math.PI * 28}`}
                              />
                            </svg>
                            {progressPercent === 100 && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check className="w-4 h-4 text-green-500" />
                              </div>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{progressPercent}% complete</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{goal.progress} of {goal.target} completed</span>
                    <span className="font-medium">{progressPercent}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-1.5" />
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  {currentStreak > 0 && (
                    <div className="bg-amber-50 rounded-full px-2 py-0.5 text-xs text-amber-700 flex items-center">
                      <Trophy className="w-3 h-3 mr-1 text-amber-500" />
                      {currentStreak} day streak
                    </div>
                  )}
                  
                  <div className={cn(
                    "text-xs font-medium rounded-full px-2 py-0.5 ml-auto",
                    goal.difficulty === "easy" ? "bg-green-50 text-green-700" :
                    goal.difficulty === "moderate" ? "bg-amber-50 text-amber-700" :
                    "bg-red-50 text-red-700"
                  )}>
                    {goal.difficulty}
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="pt-2 border-t border-gray-100 text-center">
            <a href="/goals" className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              View all goals 
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalStreakSection;
