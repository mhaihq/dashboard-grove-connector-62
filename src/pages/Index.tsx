
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import { Bird, Sun, Droplets } from 'lucide-react';
import { MetricProps } from '@/components/metrics/MetricCard';

const Index = () => {
  const handleScheduleCall = () => {
    window.location.href = '/schedule-followup';
  };

  // Example metrics with correct typing
  const exampleMetrics: MetricProps[] = [
    {
      title: "Sleep Quality",
      status: "positive",
      value: "7.3 hrs",
      trend: "up",
      trendValue: "8%",
      description: "Average over past week",
      icon: <Sun className="w-5 h-5 text-amber-500" />,
      insights: ["Consistent bedtime showing results", "Morning alertness improved"]
    },
    {
      title: "Hydration",
      status: "mixed",
      value: "5 cups",
      description: "Daily average",
      icon: <Droplets className="w-5 h-5 text-blue-500" />,
      insights: ["Below 8 cup target", "Improved from previous week"]
    },
    {
      title: "Mood Stability",
      status: "concerning",
      trend: "down",
      trendValue: "12%",
      value: "Fluctuating",
      icon: <Bird className="w-5 h-5 text-purple-500" />,
      insights: ["More variability noted", "Correlates with sleep changes"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard onScheduleCall={handleScheduleCall} />
    </div>
  );
};

export default Index;
