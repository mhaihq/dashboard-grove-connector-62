
import React from "react";
import { IntakeReportContent } from "@/components/dashboard/intake/IntakeReportContent";
import IntakeReportHeader from "@/components/intake/IntakeReportHeader";
import WellnessBanner from "@/components/intake/WellnessBanner";
import { DashboardHeader } from "@/components/DashboardHeader";

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

const IntakePlanningReport = () => {
  const userName = "Sthita";
  const userEmail = "sthita@usehana.com";

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName={userName} userEmail={userEmail} />
      <main className="p-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <IntakeReportHeader />
          <WellnessBanner />
          <div className="p-4 bg-white rounded-md mt-4 border border-gray-200 shadow-sm">
            <IntakeReportContent reportType="planning" planningSession={planningSessionData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntakePlanningReport;
