
import React, { useState } from 'react';
import { goals, goalCategories } from '@/data/goals/goalsData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Goals = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Goals");
  
  const filteredGoals = selectedCategory === "All Goals" 
    ? goals 
    : goals.filter(goal => goal.category === selectedCategory);
  
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
          const progressPercentage = Math.round((goal.progress / goal.target.count) * 100);
          
          return (
            <Card key={goal.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold line-clamp-2 leading-tight">
                    {goal.title}
                  </CardTitle>
                  <Badge 
                    variant={goal.source === 'Hana Suggested' ? 'secondary' : 'outline'}
                    className={cn(
                      goal.source === 'Hana Suggested' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 'border-gray-200'
                    )}
                  >
                    {goal.source}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-2">
                  {goal.difficulty && (
                    <span 
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs uppercase",
                        goal.difficulty === 'hard' ? "bg-red-100 text-red-800" : "bg-gray-200 text-gray-800"
                      )}
                    >
                      Hard
                    </span>
                  )}
                  {goal.term && (
                    <span 
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs uppercase",
                        goal.term === 'short term' ? "bg-green-100 text-green-800" : 
                        goal.term === 'medium term' ? "bg-yellow-100 text-yellow-800" : 
                        "bg-purple-100 text-purple-800"
                      )}
                    >
                      {goal.term === 'short term' ? 'Short' : 
                       goal.term === 'medium term' ? 'Medium' : 'Long'} Term
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-sm text-gray-600">
                      {goal.progress} / {goal.target.count} {goal.target.unit}
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
                    {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}
                  </div>
                  
                  {goal.description && (
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                      {goal.description}
                    </p>
                  )}
                  
                  {goal.nudge && (
                    <div className="mt-3 p-2 bg-blue-50 border border-blue-100 rounded-md">
                      <p className="text-sm text-blue-800">{goal.nudge}</p>
                    </div>
                  )}
                  
                  {goal.benefits && goal.benefits.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">Benefits:</p>
                      <div className="flex flex-wrap gap-1">
                        {goal.benefits.slice(0, 2).map((benefit, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                          >
                            {benefit}
                          </span>
                        ))}
                        {goal.benefits.length > 2 && (
                          <span className="text-xs text-gray-500">+{goal.benefits.length - 2} more</span>
                        )}
                      </div>
                    </div>
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
