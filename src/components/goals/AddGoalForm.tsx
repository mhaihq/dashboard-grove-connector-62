
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';
import { SheetFooter } from '@/components/ui/sheet';
import { goalCategories } from '@/data/goals/goalsData';

interface AddGoalFormProps {
  newGoal: {
    title: string;
    description: string;
    category: string;
    target: number;
    durationMonths: number;
  };
  setNewGoal: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    category: string;
    target: number;
    durationMonths: number;
  }>>;
  onClose: () => void;
  onSubmit: () => void;
  isMobile: boolean;
}

export const AddGoalForm = ({ 
  newGoal, 
  setNewGoal, 
  onClose, 
  onSubmit, 
  isMobile 
}: AddGoalFormProps) => {
  const Footer = isMobile ? SheetFooter : DialogFooter;
  
  return (
    <>
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
      
      <Footer>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button 
          onClick={onSubmit}
          disabled={!newGoal.title || newGoal.target < 1}
          className="bg-hana-green hover:bg-hana-green/90"
        >
          Create Goal
        </Button>
      </Footer>
    </>
  );
};

export default AddGoalForm;
