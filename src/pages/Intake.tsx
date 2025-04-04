
import React from 'react';
import { Lock, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface IntakeCall {
  id: number;
  title: string;
  date: string | null;
  completed: boolean;
  summary: string;
  focusAreas: string[];
}

const intakeCalls: IntakeCall[] = [
  {
    id: 1,
    title: "Initial Health Assessment",
    date: "February 13, 2025",
    completed: true,
    summary: "Conducted comprehensive health assessment using Motivational Interviewing techniques. Used OARS approach to gather information about current health status, lifestyle habits, and existing concerns. Performed universal substance use screening per SBIRT approach.",
    focusAreas: ["Health history", "Current lifestyle", "Substance use screening", "Initial goal exploration"]
  },
  {
    id: 2,
    title: "Wellness Planning Session",
    date: "February 20, 2025",
    completed: true,
    summary: "Applied Brief Intervention techniques focusing on areas identified in first call. Assessed readiness for change using scaling questions. Identified cognitive patterns that may impact health behaviors. Started collaborative goal setting process with emphasis on client autonomy.",
    focusAreas: ["Readiness assessment", "Cognitive pattern identification", "Value clarification", "Preliminary goal setting"]
  },
  {
    id: 3,
    title: "Action Plan Development",
    date: null,
    completed: false,
    summary: "Will establish concrete action steps using the Assist phase of 5A's model. Will develop problem-solving strategies for anticipated obstacles. Will arrange specific follow-up schedule and accountability mechanisms.",
    focusAreas: ["Concrete action planning", "Obstacle anticipation", "Support system development", "Follow-up scheduling"]
  }
];

const IntakePage = () => {
  const navigate = useNavigate();

  const handleViewReport = (callId: number) => {
    // For a real implementation, this would navigate to a detailed report page
    navigate('/intake-report');
  };

  return (
    <div className="container py-6 md:py-10 px-4 md:px-6 max-w-5xl">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Intake Process</h1>
        <p className="text-muted-foreground">Your three-part adaptive intake journey with Hana Health Coach</p>
      </div>

      <Tabs defaultValue="calls" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="calls">Intake Calls</TabsTrigger>
          <TabsTrigger value="info">Process Overview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calls">
          <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {intakeCalls.map((call) => (
              <Card key={call.id} className={`transition-all duration-300 h-full flex flex-col ${!call.completed ? 'bg-gray-50' : ''}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex justify-between items-start">
                    <span>{call.title}</span>
                    {!call.completed && <Lock className="h-4 w-4 text-gray-400" />}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {call.date ? call.date : "Not scheduled"}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
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
                
                <CardFooter className="pt-3">
                  {call.completed ? (
                    <Button 
                      onClick={() => handleViewReport(call.id)} 
                      className="w-full"
                      variant="outline"
                    >
                      <FileText className="mr-2 h-4 w-4" /> View Report
                    </Button>
                  ) : (
                    <Button 
                      disabled
                      variant="outline" 
                      className="w-full opacity-50"
                    >
                      <Lock className="mr-2 h-4 w-4" /> Locked
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Three-Part Adaptive Intake Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Call 1: Initial Health Assessment</h3>
                <p className="text-muted-foreground mb-2">
                  Our first conversation focuses on understanding your health journey through open-ended questions and reflective listening.
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                  <li>Comprehensive health history using Motivational Interviewing</li>
                  <li>Universal substance use screening (SBIRT approach)</li>
                  <li>"Ask" phase of the 5A's model</li>
                  <li>Trauma-informed information gathering with your control over disclosure</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Call 2: Wellness Planning Session</h3>
                <p className="text-muted-foreground mb-2">
                  Building on our initial assessment, we'll explore your readiness for change and begin developing personalized strategies.
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                  <li>Brief Intervention based on identified needs</li>
                  <li>"Advise" and "Assess readiness" phases of 5A's model</li>
                  <li>CBT-informed identification of thought patterns affecting health</li>
                  <li>Collaborative exploration of health values and priorities</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Call 3: Action Plan Development</h3>
                <p className="text-muted-foreground mb-2">
                  Our final intake call focuses on creating concrete steps and establishing ongoing support.
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                  <li>"Assist" and "Arrange follow-up" phases of 5A's model</li>
                  <li>Development of SMART goals and action plans</li>
                  <li>Problem-solving strategies for anticipated obstacles</li>
                  <li>Establishment of ongoing coaching relationship and follow-up schedule</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntakePage;
