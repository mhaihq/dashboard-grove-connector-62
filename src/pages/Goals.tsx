
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { t, getCategoryKey, getStatusKey, getDurationKey, getOriginKey, setLanguage, getCurrentLanguage, LANGUAGES } from '@/lib/i18n';
import { goals, goalCategories } from '@/data/goals/goalsData';
import { FormattedGoal } from '@/types/goals';

const Goals = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Goals");
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());
  
  const filteredGoals = selectedCategory === "All Goals" 
    ? goals 
    : goals.filter(goal => goal.category === selectedCategory);
  
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

  // Change language handler
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCurrentLang(lang);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t('goals.title')}</h1>
        <div className="flex gap-2">
          {/* Language selector */}
          <div className="mr-4 flex items-center gap-2">
            {Object.entries(LANGUAGES).map(([code, name]) => (
              <Button
                key={code}
                variant={currentLang === code ? "default" : "outline"}
                size="sm"
                onClick={() => handleLanguageChange(code)}
                className={currentLang === code ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                {name}
              </Button>
            ))}
          </div>
          <Button className="bg-hana-green hover:bg-hana-green/90 text-white">
            {t('goals.addNew')}
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2 mb-6 flex-wrap">
        {goalCategories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-hana-green hover:bg-hana-green/90" : ""}
          >
            {t(getCategoryKey(category))}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGoals.map((goal: FormattedGoal) => {
          const progressPercentage = Math.round((goal.progress / goal.target) * 100);
          
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
                    {t(getOriginKey(goal.origin))}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className={cn(getStatusColor(goal.status))}>
                    {t(getStatusKey(goal.status))}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800">
                    {t(getDurationKey(goal.duration_type))}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
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
                  <div className="text-sm text-gray-600 mb-1">
                    {new Date(goal.start_date).toLocaleDateString(currentLang.replace('_', '-'))} - {new Date(goal.end_date).toLocaleDateString(currentLang.replace('_', '-'))}
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
          <p className="text-gray-600">{t('goals.noGoals')}</p>
        </div>
      )}
    </div>
  );
};

export default Goals;
