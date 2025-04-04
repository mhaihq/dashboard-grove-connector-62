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
  current_streak?: number;
  longest_streak?: number;
  currentWeeklyStreak?: number;
  longestStreak?: number;
  thisWeekProgress?: number;
  weeklyTarget?: number;
}

interface GoalStreakSectionProps {
  goals: Goal[];
}

const GoalStreakSection: React.FC<GoalStreakSectionProps> = ({ goals }) => {
  const sortedGoals = [...goals].sort((a, b) => {
    const aProgress = (a.progress / a.target) * 100;
    const bProgress = (b.progress / b.target) * 100;
    return bProgress - aProgress;
  });

  const topGoals = sortedGoals.slice(0, 4);
  
  const totalGoalsCompleted = goals.filter(g => g.progress >= g.target).length;
  const goalsInProgress = goals.filter(g => g.progress > 0 && g.progress < g.target).length;
  
  const longestStreakGoal = [...goals].sort((a, b) => 
    (b.longest_streak || b.longestStreak || 0) - (a.longest_streak || a.longestStreak || 0)
  )[0];
  const streakDays = longestStreakGoal?.longest_streak || longestStreakGoal?.longestStreak || 0;
  const streakGoalName = longestStreakGoal?.title || "No active streak";
  
  const getProgressColor = (progressPercent: number) => {
    if (progressPercent >= 75) return 'bg-positive-light text-positive-dark';
    if (progressPercent >= 50) return 'bg-mixed-light text-mixed-dark';
    if (progressPercent >= 25) return 'bg-concerning-light text-concerning-dark';
    return 'bg-red-100 text-red-800';
  };

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
        <div className="mb-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-hana-lightGreen rounded-lg p-2">
            <p className="text-xl text-positive-dark font-bold">{totalGoalsCompleted}</p>
            <p className="text-xs text-gray-700">Completed</p>
          </div>
          <div className="bg-hana-blue rounded-lg p-2">
            <p className="text-xl text-blue-800 font-bold">{goalsInProgress}</p>
            <p className="text-xs text-gray-700">In Progress</p>
          </div>
          <div className="bg-hana-yellow rounded-lg p-2">
            <p className="text-xl text-mixed-dark font-bold">{streakDays}</p>
            <p className="text-xs text-gray-700">
              <span className="inline-block truncate max-w-full">
                {streakDays > 0 ? "Longest Streak" : "No Streak"}
              </span>
            </p>
          </div>
        </div>
        
        {streakDays > 0 && (
          <div className="mb-4 p-2 border border-amber-200 bg-amber-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <p className="text-sm text-amber-800 truncate">
                Longest streak: <span className="font-semibold">{streakDays} days</span> on "{streakGoalName}"
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {topGoals.map((goal) => {
            const progressPercent = Math.round((goal.progress / goal.target) * 100);
            const daysLeft = Math.ceil((new Date(goal.end_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
            const currentStreak = goal.current_streak || goal.currentWeeklyStreak || 0;
            
            return (
              <div 
                key={goal.id} 
                className={cn(
                  "border rounded-lg p-3 hover:shadow-sm transition",
                  getProgressColor(progressPercent)
                )}
              >
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
                
                {currentStreak > 0 && (
                  <div className="mt-2 flex">
                    <div className="bg-amber-50 rounded-full px-2 py-0.5 text-xs text-amber-700 flex items-center">
                      <Trophy className="w-3 h-3 mr-1 text-amber-500" />
                      {currentStreak} day streak
                    </div>
                  </div>
                )}
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
