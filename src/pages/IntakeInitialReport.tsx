
import React from "react";
import { IntakeReportContent } from "@/components/dashboard/intake/IntakeReportContent";
import IntakeReportHeader from "@/components/intake/IntakeReportHeader";
import WellnessBanner from "@/components/intake/WellnessBanner";
import { FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/DashboardHeader";

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

const IntakeInitialReport = () => {
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
            <IntakeReportContent reportType="initial" initialAssessment={initialAssessmentData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntakeInitialReport;
