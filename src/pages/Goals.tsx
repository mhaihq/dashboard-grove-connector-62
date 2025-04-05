
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trophy, Check, Calendar, Plus, X, Sparkles } from 'lucide-react';
import { formattedGoals, suggestedGoals } from '@/data/goals/goalsData';
import { goalCategories } from '@/data/goals/goalsData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormattedGoal } from '@/types/goals';
import { toast } from 'sonner';

const Goals = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Goals");
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const isMobile = useIsMobile();
  const [suggestedGoalsList, setSuggestedGoalsList] = useState(suggestedGoals);
  
  // New goal state
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'Physical Health',
    target: 5,
    durationMonths: 3
  });
  
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
  
  const handleCreateGoal = () => {
    // Would typically make an API call here
    
    // Mock creating a new goal
    const today = new Date();
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + newGoal.durationMonths);
    
    const goalToAdd: Partial<FormattedGoal> = {
      id: formattedGoals.length + 1,
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      target: newGoal.target,
      progress: 0,
      start_date: today.toISOString(),
      end_date: endDate.toISOString(),
      origin: 'PATIENT',
      status: 'ACTIVE',
      source: 'Personal',
      current_streak: 0,
      longest_streak: 0,
      duration_type: newGoal.durationMonths <= 1 ? 'SHORT' : 
                  newGoal.durationMonths <= 6 ? 'MEDIUM' : 'LONG',
    };
    
    // In a real app, we would save this to the backend
    
    // Close dialog and reset form
    setIsAddGoalOpen(false);
    setNewGoal({
      title: '',
      description: '',
      category: 'Physical Health',
      target: 5,
      durationMonths: 3
    });
    
    toast.success("Goal created successfully!");
  };
  
  // Handle adopting a suggested goal
  const handleAdoptSuggestedGoal = (goal: Partial<FormattedGoal>) => {
    // In a real app, we would save this to the backend
    toast.success(`Added "${goal.title}" to your goals!`);
    
    // Remove from suggested goals
    setSuggestedGoalsList(current => 
      current.filter(g => g.id !== goal.id)
    );
  };
  
  // Handle dismissing a suggested goal
  const handleDismissSuggestedGoal = (goalId: number) => {
    setSuggestedGoalsList(current => 
      current.filter(g => g.id !== goalId)
    );
    toast("Suggestion dismissed");
  };
  
  const GoalDialog = isMobile ? Sheet : Dialog;
  const GoalDialogContent = isMobile ? SheetContent : DialogContent;
  const GoalDialogHeader = isMobile ? SheetHeader : DialogHeader;
  const GoalDialogTitle = isMobile ? SheetTitle : DialogTitle;
  const GoalDialogDescription = isMobile ? SheetDescription : DialogDescription;
  const GoalDialogFooter = isMobile ? SheetFooter : DialogFooter;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Your Goals</h1>
        <Button 
          className="bg-hana-green hover:bg-hana-green/90 text-white"
          onClick={() => setIsAddGoalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
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
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Suggested Goals Section */}
      {suggestedGoalsList.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
            <h2 className="text-xl font-semibold">Suggested by Hana</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {suggestedGoalsList.map(goal => (
              <Card key={goal.id} className="overflow-hidden border-amber-200 bg-amber-50/40 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-amber-900">{goal.title}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-7 w-7 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      onClick={() => handleDismissSuggestedGoal(goal.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  </div>
                  
                  <p className="text-sm text-amber-800 mt-1 mb-3">{goal.description}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                      {getDurationLabel(goal.duration_type)}
                    </Badge>
                    <span className="text-xs text-amber-700">Target: {goal.target} actions</span>
                  </div>
                  
                  <Button 
                    variant="outline"
                    className="w-full mt-4 border-amber-300 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
                    onClick={() => handleAdoptSuggestedGoal(goal)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add to My Goals
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Current Goals Grid */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Currently Tracking</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGoals.map(goal => {
            const progressPercentage = Math.round((goal.progress / goal.target) * 100);
            const currentStreak = goal.current_streak || 0;
            
            return (
              <Card key={goal.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                  {/* Simplified Streak Information */}
                  {currentStreak > 0 && (
                    <div className="mb-4 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-medium text-amber-800">{currentStreak} day streak</span>
                    </div>
                  )}

                  {/* Overall Progress */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm text-gray-600">
                        {goal.progress} / {goal.target}
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
                    <div className="text-sm text-gray-600 mb-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
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
      </div>
      
      {filteredGoals.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600">No goals found in this category.</p>
        </div>
      )}
      
      {/* Add Goal Dialog/Sheet (responsive) */}
      <GoalDialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
        <GoalDialogContent className="sm:max-w-[500px]">
          <GoalDialogHeader>
            <GoalDialogTitle>Create New Goal</GoalDialogTitle>
            <GoalDialogDescription>
              Add a new personal goal to track your progress
            </GoalDialogDescription>
          </GoalDialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Goal Title</label>
              <Input 
                id="title"
                placeholder="Enter goal title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description"
                placeholder="Enter a brief description"
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <select 
                  id="category"
                  className="w-full p-2 border rounded-md"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                >
                  {goalCategories.filter(c => c !== "All Goals").map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="target" className="text-sm font-medium">Target (Actions)</label>
                <Input 
                  id="target"
                  type="number"
                  min="1"
                  placeholder="How many actions to complete"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({...newGoal, target: parseInt(e.target.value) || 1})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="duration" className="text-sm font-medium">Duration (Months)</label>
              <Input 
                id="duration"
                type="number"
                min="1"
                max="24"
                placeholder="How many months"
                value={newGoal.durationMonths}
                onChange={(e) => setNewGoal({...newGoal, durationMonths: parseInt(e.target.value) || 1})}
              />
            </div>
          </div>
          
          <GoalDialogFooter>
            <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateGoal}
              disabled={!newGoal.title || newGoal.target < 1}
              className="bg-hana-green hover:bg-hana-green/90"
            >
              Create Goal
            </Button>
          </GoalDialogFooter>
        </GoalDialogContent>
      </GoalDialog>
    </div>
  );
};

export default Goals;
