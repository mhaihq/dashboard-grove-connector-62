
import React from 'react';
import { Lock, FileText, ArrowRight, PhoneCall } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface IntakeCall {
  id: number;
  title: string;
  date: string | null;
  completed: boolean;
  summary: string;
  focusAreas: string[];
  talkPoints: string[];
  reportUrl: string;
}

const intakeCalls: IntakeCall[] = [
  {
    id: 1,
    title: "Initial Health Assessment",
    date: "February 13, 2025",
    completed: true,
    summary: "Conducted comprehensive health assessment using Motivational Interviewing techniques. Used OARS approach to gather information about current health status, lifestyle habits, and existing concerns. Performed universal substance use screening per SBIRT approach.",
    focusAreas: ["Health history", "Current lifestyle", "Substance use screening", "Initial goal exploration"],
    talkPoints: [
      "Brief overview of your health history and current concerns",
      "Discussion of your current lifestyle habits and daily routines",
      "Initial exploration of your health goals and priorities",
      "Completely confidential 30-minute conversation"
    ],
    reportUrl: "/intake-report/initial"
  },
  {
    id: 2,
    title: "Wellness Planning Session",
    date: "February 20, 2025",
    completed: true,
    summary: "Applied Brief Intervention techniques focusing on areas identified in first call. Assessed readiness for change using scaling questions. Identified cognitive patterns that may impact health behaviors. Started collaborative goal setting process with emphasis on client autonomy.",
    focusAreas: ["Readiness assessment", "Cognitive pattern identification", "Value clarification", "Preliminary goal setting"],
    talkPoints: [
      "Review insights from your initial assessment",
      "Explore your readiness and motivation for specific changes",
      "Begin identifying patterns that may affect your health goals",
      "Start developing personalized wellness strategies together"
    ],
    reportUrl: "/intake-report/deep-dive"
  },
  {
    id: 3,
    title: "Action Plan Development",
    date: null,
    completed: false,
    summary: "Will establish concrete action steps using the Assist phase of 5A's model. Will develop problem-solving strategies for anticipated obstacles. Will arrange specific follow-up schedule and accountability mechanisms.",
    focusAreas: ["Concrete action planning", "Obstacle anticipation", "Support system development", "Follow-up scheduling"],
    talkPoints: [
      "Create detailed action steps for your priority health goals",
      "Develop strategies for overcoming potential obstacles",
      "Establish your personalized follow-up and support plan",
      "Finalize your comprehensive wellness roadmap"
    ],
    reportUrl: "/intake-report/planning"
  }
];

const TalkToHanaDialog = ({ callTitle, talkPoints }: { callTitle: string, talkPoints: string[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <PhoneCall className="h-4 w-4" /> Talk to Hana
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{callTitle}</DialogTitle>
          <DialogDescription>
            Here's what to expect in this session with Hana
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ul className="space-y-2">
            {talkPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                  {index + 1}
                </span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <Button type="button" className="w-full">
            Schedule Call with Hana
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const IntakePage = () => {
  const navigate = useNavigate();

  const handleViewReport = (reportUrl: string) => {
    navigate(reportUrl);
  };

  return (
    <div className="container py-6 md:py-10 px-4 md:px-6 max-w-5xl">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Intake Process</h1>
        <p className="text-muted-foreground">Your three-part adaptive intake journey with Hana Health Coach</p>
      </div>

      <div className="relative">
        {/* Desktop progression line (hidden on mobile) */}
        <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-blue-200 hidden md:block" />
        
        <div className="space-y-8 md:space-y-12 relative">
          {intakeCalls.map((call, index) => (
            <div key={call.id} className="relative">
              {/* Mobile progression arrow (visible only on small screens) */}
              {index < intakeCalls.length - 1 && (
                <div className="flex justify-center my-4 md:hidden">
                  <ArrowRight className="h-6 w-6 text-blue-300" />
                </div>
              )}
              
              <Card className={`transition-all duration-300 md:max-w-2xl mx-auto ${!call.completed ? 'bg-gray-50' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg flex gap-2 items-center">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
                        {call.id}
                      </div>
                      <span>{call.title}</span>
                      {!call.completed && <Lock className="h-4 w-4 text-gray-400" />}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {call.date ? call.date : "Not scheduled"}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {call.completed ? (
                    <>
                      <p className="text-sm mb-4">{call.summary}</p>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium mb-2">Focus Areas:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {call.focusAreas.map((area, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <Lock className="h-8 w-8 text-gray-300 mb-3" />
                      <p className="text-gray-500 text-sm">
                        This session will be unlocked after completing your previous intake calls
                      </p>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="pt-3 flex flex-wrap gap-3 justify-between">
                  <TalkToHanaDialog callTitle={call.title} talkPoints={call.talkPoints} />
                  
                  {call.completed ? (
                    <Button 
                      onClick={() => handleViewReport(call.reportUrl)}
                      variant="outline"
                    >
                      <FileText className="mr-2 h-4 w-4" /> View Report
                    </Button>
                  ) : (
                    <Button 
                      disabled
                      variant="outline" 
                      className="opacity-50"
                    >
                      <Lock className="mr-2 h-4 w-4" /> Locked
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntakePage;
