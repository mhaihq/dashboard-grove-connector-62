
import React, { useState } from 'react';
import { FileText, Search, Calendar } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import WellnessBanner from '@/components/intake/WellnessBanner';
import IntakeReportHeader from '@/components/intake/IntakeReportHeader';
import { IntakeReportContent } from '@/components/dashboard/intake/IntakeReportContent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IntakeReport = () => {
  const userName = "Matteo";
  const userEmail = "matteo@matteowastaken.com";
  const [activeReport, setActiveReport] = useState<'initial' | 'deepDive' | 'planning'>('initial');
  
  // Initial Assessment Data
  const initialAssessmentData = {
    date: "February 13, 2025",
    summary: "Conducted comprehensive health assessment using Motivational Interviewing techniques. Used OARS approach to gather information about current health status, lifestyle habits, and existing concerns. Performed universal substance use screening per SBIRT approach.",
    techniques: [
      "Motivational Interviewing",
      "Open-ended Questions",
      "Affirmations",
      "Reflective Listening",
      "SBIRT Substance Use Screening"
    ],
    keyFindings: [
      {
        title: "Health History & Background",
        content: [
          "Family history of anxiety disorders on maternal side",
          "No significant physical health conditions",
          "Started experiencing sleep issues 6 months ago coinciding with work promotion",
          "Previous therapy experience 2 years ago for work-related stress",
          "Regular alcohol consumption started gradually over the past year"
        ]
      },
      {
        title: "Current Lifestyle",
        content: [
          "Works 50-60 hours weekly in high-pressure management role",
          "Limited physical activity (once per week)",
          "Screen time extends to late evening hours",
          "1-2 alcoholic drinks daily for relaxation",
          "Irregular meal times due to work schedule"
        ]
      },
      {
        title: "Primary Concerns",
        content: [
          "Sleep disruption (rating: 2/5)",
          "Stress management (rating: 2/5)",
          "Emotional regulation (rating: 2/5)",
          "Work-life boundaries (rating: 1/5)"
        ]
      },
      {
        title: "Strengths & Support Systems",
        content: [
          "Strong family support system with particularly close relationship with wife",
          "High cognitive functioning and professional success",
          "Good insight into problematic patterns",
          "Prior positive experience with therapy",
          "Financial stability and healthcare access"
        ]
      }
    ],
    quotes: [
      {
        text: "I just don't sleep... I feel that I'm never tired. I feel that my brain is always on.",
        context: "When discussing sleep issues"
      },
      {
        text: "I find myself drinking every night just to feel normal and wind down.",
        context: "On alcohol use patterns"
      },
      {
        text: "I feel nervous a lot of the time, and then... Kind of angry... That's with no reason.",
        context: "Describing emotional state"
      }
    ]
  };
  
  // Deep Dive Data
  const deepDiveData = {
    date: "February 20, 2025",
    summary: "Applied Brief Intervention techniques focusing on areas identified in first call. Assessed readiness for change using scaling questions. Identified cognitive patterns that may impact health behaviors. Started collaborative goal setting process with emphasis on client autonomy.",
    techniques: [
      "Brief Intervention",
      "Scaling Questions",
      "Cognitive Pattern Recognition",
      "Collaborative Goal Setting",
      "Values Exploration"
    ],
    insights: [
      {
        title: "Sleep Pattern Analysis",
        content: [
          "Racing thoughts correlate with evening work emails",
          "Screen exposure within 2 hours of bedtime disrupts melatonin production",
          "Alcohol initially induces drowsiness but fragments deep sleep cycles",
          "Morning routine lacks consistency, affecting circadian rhythm",
          "Bedroom environment contains multiple work-related triggers"
        ]
      },
      {
        title: "Stress Response Patterns",
        content: [
          "Physical manifestations include tension headaches and jaw clenching",
          "Limited stress release outlets beyond alcohol",
          "Perfectionist tendencies exacerbate perceived work pressure",
          "Difficulty saying 'no' to additional responsibilities",
          "Stress carrying over from work to home environment"
        ]
      },
      {
        title: "Emotional Regulation",
        content: [
          "Limited emotional vocabulary when describing states beyond 'stressed'",
          "Tendency to intellectualize rather than process emotions",
          "Suppression of emotional responses during workday",
          "Release of accumulated tension occurs in safe home environment",
          "Connection between emotional regulation and sleep quality"
        ]
      },
      {
        title: "Readiness Assessment",
        content: [
          "Sleep improvement: 8/10 readiness",
          "Work boundary setting: 6/10 readiness",
          "Alcohol reduction: 5/10 readiness",
          "Regular exercise integration: 7/10 readiness",
          "Digital detox practices: 8/10 readiness"
        ]
      }
    ],
    barriersIdentified: [
      "Workplace culture expects constant availability",
      "Limited awareness of relaxation techniques",
      "Habit-formed association between alcohol and relaxation",
      "Insufficient transition time between work and home roles",
      "Fear that performance may suffer with reduced work hours"
    ],
    strengths: [
      "High intrinsic motivation to improve wellbeing",
      "Previous successful health behavior changes",
      "Supportive spouse willing to participate in changes",
      "Analytical thinking helpful for tracking progress",
      "Financial resources for wellness supports if needed"
    ],
    quotes: [
      {
        text: "When I try to rate my stress on a scale of 1-10, I realize I've been living at an 8 for so long that it feels normal.",
        context: "During scaling exercise"
      },
      {
        text: "I'm starting to see how these patterns connect - my work habits directly affect my sleep, which affects everything else.",
        context: "Insight moment"
      },
      {
        text: "I know I need to make changes. I'm just not sure my company will let me.",
        context: "On work-life boundary challenges"
      }
    ]
  };
  
  // Planning Session Data
  const planningSessionData = {
    date: "February 27, 2025",
    summary: "Established concrete action steps using the Assist phase of 5A's model. Developed problem-solving strategies for anticipated obstacles. Arranged specific follow-up schedule and accountability mechanisms.",
    actionSteps: [
      {
        title: "Sleep Hygiene Protocol",
        steps: [
          "Implement 60-minute technology-free buffer before bedtime",
          "Create dedicated relaxation space separate from work areas",
          "Practice 4-7-8 breathing technique when lying down to sleep",
          "Maintain consistent sleep-wake schedule (10:30 PM - 6:30 AM)",
          "Use bedroom for sleep and intimacy only (no work materials)"
        ],
        timeline: "Begin immediately, full implementation within 1 week"
      },
      {
        title: "Work Boundary Establishment",
        steps: [
          "Communicate availability hours to team (8:00 AM - 6:30 PM weekdays)",
          "Set up auto-responders for after-hours emails",
          "Create transition ritual between work and home roles",
          "Schedule focused work blocks with notification pauses",
          "Identify one workday to leave by 5:00 PM guaranteed"
        ],
        timeline: "Phased implementation over 2 weeks"
      },
      {
        title: "Alcohol Moderation Strategy",
        steps: [
          "Establish 3 alcohol-free days per week (Mon, Wed, Sun initially)",
          "Create substitute relaxation routine with herbal tea and reading",
          "Practice urge surfing technique when feeling desire to drink",
          "Log feelings before drinking to identify emotional triggers",
          "Set 2-drink maximum for any single evening"
        ],
        timeline: "Begin with one alcohol-free day, add second in week 2, third in week 3"
      },
      {
        title: "Stress Reduction Practices",
        steps: [
          "Download guided meditation app and use 10 min daily",
          "Schedule two 30-minute walks outdoors during workdays",
          "Implement 3 daily 60-second breathing breaks (10:30 AM, 1:30 PM, 4:30 PM)",
          "Join weekly yoga class with supportive friend",
          "Create 'worry time' for 15 minutes daily to contain rumination"
        ],
        timeline: "Implement one practice each week over 5 weeks"
      }
    ],
    supportResources: [
      {
        type: "Digital Resources",
        resources: [
          "Insight Timer app (free guided meditations)",
          "Sleep Cycle tracker (sleep quality monitoring)",
          "Microsoft Focus Assistant (work boundary setting)",
          "Drink Control app (alcohol monitoring)"
        ]
      },
      {
        type: "Professional Support",
        resources: [
          "Weekly check-ins with Hana health coach",
          "Quarterly assessments with physician (covered by insurance)",
          "Employee Assistance Program - 6 free CBT sessions",
          "Sleep specialist referral if needed (in-network option provided)"
        ]
      },
      {
        type: "Community Resources",
        resources: [
          "Community center stress management workshop (March 15)",
          "Local executive wellness group (meets monthly)",
          "Online forum for professionals seeking work-life balance",
          "Partner yoga classes at neighborhood studio"
        ]
      }
    ],
    followUpSchedule: [
      {
        date: "March 5, 2025",
        focus: "Sleep hygiene implementation review and troubleshooting"
      },
      {
        date: "March 12, 2025",
        focus: "Work boundary progress and obstacle management"
      },
      {
        date: "March 19, 2025",
        focus: "Alcohol moderation check-in and adjustment"
      },
      {
        date: "March 26, 2025",
        focus: "Comprehensive one-month progress assessment"
      },
      {
        date: "April 10, 2025",
        focus: "Long-term sustainability planning and habit reinforcement"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        userName={userName} 
        userEmail={userEmail}
      />
      
      <main className="p-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <IntakeReportHeader />
          <WellnessBanner />
          
          <Tabs 
            defaultValue="initial" 
            className="mt-8"
            onValueChange={(value) => setActiveReport(value as 'initial' | 'deepDive' | 'planning')}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="initial" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Initial Assessment</span>
                <span className="sm:hidden">Assessment</span>
              </TabsTrigger>
              <TabsTrigger value="deepDive" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Deep Dive</span>
                <span className="sm:hidden">Deep Dive</span>
              </TabsTrigger>
              <TabsTrigger value="planning" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Action Planning</span>
                <span className="sm:hidden">Planning</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="p-4 bg-white rounded-md mt-4 border border-gray-200 shadow-sm">
              <TabsContent value="initial">
                <IntakeReportContent 
                  reportType="initial" 
                  initialAssessment={initialAssessmentData}
                />
              </TabsContent>
              
              <TabsContent value="deepDive">
                <IntakeReportContent 
                  reportType="deepDive" 
                  deepDive={deepDiveData}
                />
              </TabsContent>
              
              <TabsContent value="planning">
                <IntakeReportContent 
                  reportType="planning" 
                  planningSession={planningSessionData}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default IntakeReport;
