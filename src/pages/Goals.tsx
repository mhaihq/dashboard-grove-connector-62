
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import { formattedGoals, suggestedGoals } from '@/data/goals/goalsData';
import { goalCategories } from '@/data/goals/goalsData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { FormattedGoal } from '@/types/goals';
import { toast } from 'sonner';
import GoalCard from '@/components/goals/GoalCard';
import SuggestedGoalCard from '@/components/goals/SuggestedGoalCard';
import AddGoalForm from '@/components/goals/AddGoalForm';

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
              <SuggestedGoalCard 
                key={goal.id}
                goal={goal}
                onAdopt={handleAdoptSuggestedGoal}
                onDismiss={handleDismissSuggestedGoal}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Current Goals Grid */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Currently Tracking</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGoals.map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
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
          
          <AddGoalForm 
            newGoal={newGoal}
            setNewGoal={setNewGoal}
            onClose={() => setIsAddGoalOpen(false)}
            onSubmit={handleCreateGoal}
            isMobile={isMobile}
          />
        </GoalDialogContent>
      </GoalDialog>
    </div>
  );
};

export default Goals;
