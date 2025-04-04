
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, CheckCircle2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { goals, goalCategories, suggestedGoals } from '@/data/goals/goalsData';
import { Goal } from '@/types/goals';
import { cn } from '@/lib/utils';

const Goals = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Goals");
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null);

  const filteredGoals = selectedCategory === "All Goals" 
    ? goals 
    : goals.filter((goal) => goal.category === selectedCategory);

  const toggleGoalExpansion = (goalId: string) => {
    setExpandedGoalId(expandedGoalId === goalId ? null : goalId);
  };

  const formatDateDisplay = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const calculateProgress = (goal: Goal) => {
    return Math.round((goal.progress / goal.target.count) * 100);
  };

  const getProgressColor = (progressPercent: number) => {
    if (progressPercent > 66) return 'bg-green-100 text-green-800';
    if (progressPercent > 33) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="container px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Goal Tracking</h1>
        <p className="text-xl text-gray-500 mt-2">Track your progress and maintain wellness</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {goalCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              selectedCategory === category 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Active Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {filteredGoals.map((goal) => {
          const progressPercent = calculateProgress(goal);
          const isExpanded = expandedGoalId === goal.id;
          
          return (
            <Card 
              key={goal.id} 
              className="overflow-hidden border-gray-200 hover:shadow-sm transition-all"
            >
              <CardContent className="p-0">
                <div 
                  className="p-5 cursor-pointer flex justify-between items-start"
                  onClick={() => toggleGoalExpansion(goal.id)}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">{goal.title}</h3>
                      <Badge 
                        variant={goal.source === "Hana Suggested" ? "outline" : "secondary"}
                        className={goal.source === "Hana Suggested" 
                          ? "bg-blue-50 text-blue-800" 
                          : "bg-green-50 text-green-800"
                        }
                      >
                        {goal.source}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                      {goal.duration} • {goal.category}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>
                          {formatDateDisplay(goal.startDate)} - {formatDateDisplay(goal.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>
                          Target: {goal.target.count} {goal.target.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {isExpanded ? 
                      <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </div>

                <div className="px-5 pb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>
                      {goal.progress} / {goal.target.count} {goal.target.unit.split('/')[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={progressPercent} 
                      className={cn(
                        "h-2 flex-1",
                        progressPercent > 66 ? "bg-secondary text-green-500" :
                        progressPercent > 33 ? "bg-secondary text-amber-500" :
                        "bg-secondary text-red-500"
                      )}
                    />
                    <span 
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        getProgressColor(progressPercent)
                      )}
                    >
                      {progressPercent}%
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5">
                    <Separator className="my-3" />
                    
                    {goal.checkIns && goal.checkIns.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-2">Last Check-In Note</h4>
                        <div className="bg-gray-50 rounded-md p-3 text-sm">
                          <p>- {goal.checkIns[goal.checkIns.length - 1].note}</p>
                        </div>
                      </div>
                    )}
                    
                    {goal.nudge && (
                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-2">Hana's Nudge</h4>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 text-sm text-blue-800">
                          "{goal.nudge}"
                        </div>
                      </div>
                    )}
                    
                    {goal.evidence && (
                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-2">Evidence</h4>
                        <p className="text-sm text-gray-600">{goal.evidence}</p>
                      </div>
                    )}
                    
                    {goal.benefits && goal.benefits.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-2">Benefits</h4>
                        <ul className="text-sm space-y-1">
                          {goal.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-gray-400">→</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" className="mr-2">Log Progress</Button>
                      <Button>Mark Complete</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Suggested Goals */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Suggested Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestedGoals.map((goal, index) => (
            <Card 
              key={index} 
              className="border border-dashed border-gray-300 hover:border-gray-400 transition-all"
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium mb-1">{goal.title}</h3>
                    <Badge 
                      variant="outline" 
                      className="mb-3 bg-purple-50 text-purple-800"
                    >
                      {goal.category}
                    </Badge>
                    
                    <p className="text-gray-600 mb-4">{goal.description}</p>
                    
                    {goal.benefits && goal.benefits.length > 0 && (
                      <div className="mb-3">
                        <h4 className="font-medium text-sm mb-2">Benefits:</h4>
                        <ul className="text-sm space-y-1">
                          {goal.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-gray-400">→</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                      {goal.difficulty && (
                        <span 
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs uppercase",
                            goal.difficulty === 'easy' ? "bg-green-100 text-green-800" :
                            goal.difficulty === 'medium' ? "bg-amber-100 text-amber-800" :
                            "bg-red-100 text-red-800"
                          )}
                        >
                          {goal.difficulty} difficulty
                        </span>
                      )}
                      
                      {goal.term && (
                        <span 
                          className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs uppercase"
                        >
                          {goal.term}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button size="icon" variant="outline" className="rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;
