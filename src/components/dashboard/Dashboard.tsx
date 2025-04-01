
import React from 'react';
import { DashboardWelcome } from '@/components/dashboard/DashboardWelcome';
import { KeyHealthIndicators } from '@/components/dashboard/KeyHealthIndicators';
import { ProgressJournal } from '@/components/dashboard/ProgressJournal';
import { CarePlan } from '@/components/dashboard/CarePlan';
import { Milestones } from '@/components/dashboard/Milestones';
import { HealthPulse } from '@/components/dashboard/HealthPulse';
import { ContextBanner } from '@/components/dashboard/ContextBanner';
import { HealthRecommendations } from '@/components/dashboard/HealthRecommendations';
import { IntakeSummary } from '@/components/dashboard/IntakeSummary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, Clipboard, Trophy, Calendar, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  userInfo, welcome, userBackground, overview, 
  healthIndicators, journalEntries, carePlanItems, 
  suggestedPrograms, medicarePrograms, milestones, functionalAreas,
  clinicalRecommendations
} from '@/data/index';
import { HealthPulseItem } from '@/types/dashboard';

interface DashboardProps {
  onScheduleCall: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onScheduleCall }) => {
  // Format health assessment data for the pulse chart
  const healthAssessmentData: HealthPulseItem[] = functionalAreas.map(area => ({
    area: area.title,
    score: area.rating * 25,
    improving: area.key === 'sleep'
  }));

  // Calculate milestone achievement metrics
  const milestonesData = {
    weeklyPoints: journalEntries.reduce((sum, entry) => sum + entry.points, 0),
    level: 2,
    levelName: "Consistent Mover",
    nextLevel: "Level 3",
    pointsToNextLevel: 55,
    achievements: milestones.map(milestone => ({
      title: milestone.title,
      unlocked: milestone.completed,
      progress: milestone.completed ? 100 : (milestone.currentStreak / milestone.requiredStreak) * 100,
      icon: <Trophy className="w-5 h-5 text-gray-400" />
    }))
  };

  // Get relevant life events for context
  const notableLifeChanges = overview.find(section => 
    section.title === "Notable Life Changes"
  )?.items || [];
  
  // Calculate total journal points for summary
  const totalJournalPoints = journalEntries.reduce((sum, entry) => sum + (entry.points || 0), 0);
  
  // Get positive entries for welcome message
  const positiveEntries = journalEntries.filter(entry => entry.status === 'positive');
  
  // Create a personalized welcome message
  const welcomeMessage = positiveEntries.length > 0 
    ? `Last week, you ${positiveEntries.map(e => e.text.toLowerCase().replace(':', '')).join(', and ')}. You're doing better than you think — let's keep it going.` 
    : "Let's keep building on your progress — small steps, big impact.";
  
  // Calculate next scheduled check-in date
  const today = new Date();
  const nextWednesday = new Date(today);
  nextWednesday.setDate(today.getDate() + (3 - today.getDay() + 7) % 7);
  nextWednesday.setHours(17, 30, 0); // 5:30 PM
  const nextCheckInDate = nextWednesday.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
  
  return (
    <>
      {/* 1. Welcome & Health Pulse (Top) */}
      <div className="mb-8">
        <DashboardWelcome 
          userName={userInfo.name.split(' ')[0]}
          lastCheckIn="March 15, 2025"
          medicareStatus="Enrolled"
          riskScore="Medium"
          riskTrend="Improving"
          welcomeMessage={welcomeMessage}
        />
        <div className="mt-4">
          <a 
            href="/schedule-followup" 
            className="inline-flex items-center text-hana-green hover:text-green-700 font-medium"
          >
            ✨ Want to check in today? Book your next AI call here.
          </a>
        </div>
      </div>
      
      {/* Health Pulse Chart */}
      <div className="mb-8">
        <HealthPulse 
          data={healthAssessmentData}
          mostImproved="Sleep"
          focusArea="Hydration"
          positiveAreas={4}
          totalAreas={6}
        />
      </div>
      
      {/* 2. Current Care Plan */}
      <div className="mb-8">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">
              🧭 Your Active Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CarePlan items={carePlanItems} />
            
            <div className="mt-5 flex items-center text-sm text-gray-600 border-t pt-4 border-gray-100">
              <Calendar className="w-4 h-4 mr-2 text-hana-green" />
              <span>Weekly Check-in Scheduled: </span>
              <span className="font-medium ml-1">{nextCheckInDate}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 3. Functional Area Breakdown */}
      <div className="mb-8">
        <KeyHealthIndicators healthIndicators={healthIndicators} />
      </div>
      
      {/* 4. Your Journey So Far (merged section) */}
      <div className="mb-8">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">
              📘 Your Journey So Far
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-3">
            <Tabs defaultValue="progress">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="progress">Your Progress</TabsTrigger>
                <TabsTrigger value="plans">Active Plans</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="progress" className="mt-0">
                <div className="flex items-center mb-3">
                  <ScrollText className="w-5 h-5 text-hana-green mr-2" />
                  <h3 className="font-medium">Weekly Journal</h3>
                  <div className="ml-auto text-sm font-medium text-hana-green">{totalJournalPoints} points earned</div>
                </div>
                <ProgressJournal entries={journalEntries} />
                
                <div className="mt-4 text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Last updated: March 15, 2025</span>
                </div>
              </TabsContent>
              
              <TabsContent value="plans" className="mt-0">
                <div className="flex items-center mb-3">
                  <Clipboard className="w-5 h-5 text-hana-green mr-2" />
                  <h3 className="font-medium">Smart Recommendations</h3>
                </div>
                <HealthRecommendations 
                  recommendations={clinicalRecommendations} 
                  medicarePrograms={medicarePrograms}
                  onScheduleCall={onScheduleCall}
                  journalEntries={journalEntries}
                  carePlanItems={carePlanItems}
                  milestonesData={milestonesData}
                />
              </TabsContent>
              
              <TabsContent value="milestones" className="mt-0">
                <div className="flex items-center mb-3">
                  <Trophy className="w-5 h-5 text-hana-green mr-2" />
                  <h3 className="font-medium">Achievements & Progress</h3>
                </div>
                <Milestones data={milestonesData} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* 5. Full Intake Archive */}
      <div className="mb-8">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">
              📘 Your Full Health Story
            </CardTitle>
          </CardHeader>
          <CardContent>
            <IntakeSummary 
              date="February 13, 2025"
              welcomeMessage={welcome.message}
              background={userBackground}
              goals={overview.find(item => item.title === "Goals and Desires")?.items || []}
              overviewSections={overview}
              concerns={[
                `Sleep disruption (rating: ${functionalAreas.find(area => area.key === 'sleep')?.rating}/5)`,
                `Stress management (rating: ${functionalAreas.find(area => area.key === 'stressManagement')?.rating}/5)`,
                `Emotional regulation (rating: ${functionalAreas.find(area => area.key === 'emotionalRegulation')?.rating}/5)`
              ]}
              detailedAssessment={{
                sleep: {
                  observations: functionalAreas.find(area => area.key === 'sleep')?.observations || [],
                  quote: functionalAreas.find(area => area.key === 'sleep')?.evidence || ""
                },
                emotionalRegulation: {
                  observations: functionalAreas.find(area => area.key === 'emotionalRegulation')?.observations || [],
                  quote: functionalAreas.find(area => area.key === 'emotionalRegulation')?.evidence || ""
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
