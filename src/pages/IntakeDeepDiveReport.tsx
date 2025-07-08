
import React from "react";
import { IntakeReportContent } from "@/components/dashboard/intake/IntakeReportContent";
import IntakeReportHeader from "@/components/intake/IntakeReportHeader";
import WellnessBanner from "@/components/intake/WellnessBanner";
import { DashboardHeader } from "@/components/DashboardHeader";

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

const IntakeDeepDiveReport = () => {
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
            <IntakeReportContent reportType="deepDive" deepDive={deepDiveData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntakeDeepDiveReport;
