
import React from 'react';
import { ChevronRight, FileText, Search, Calendar, Quote } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ReportSection {
  title: string;
  content: string[];
}

interface Quote {
  text: string;
  context?: string;
}

interface InitialAssessmentProps {
  date: string;
  summary: string;
  techniques: string[];
  keyFindings: ReportSection[];
  quotes: Quote[];
}

interface DeepDiveProps {
  date: string;
  summary: string;
  techniques: string[];
  insights: ReportSection[];
  barriersIdentified: string[];
  strengths: string[];
  quotes: Quote[];
}

interface PlanningSessionProps {
  date: string;
  summary: string;
  actionSteps: {
    title: string;
    steps: string[];
    timeline: string;
  }[];
  supportResources: {
    type: string;
    resources: string[];
  }[];
  followUpSchedule: {
    date: string;
    focus: string;
  }[];
}

interface IntakeReportContentProps {
  reportType: 'initial' | 'deepDive' | 'planning';
  initialAssessment?: InitialAssessmentProps;
  deepDive?: DeepDiveProps;
  planningSession?: PlanningSessionProps;
}

export const IntakeReportContent: React.FC<IntakeReportContentProps> = ({
  reportType,
  initialAssessment,
  deepDive,
  planningSession
}) => {
  if (reportType === 'initial' && initialAssessment) {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="flex items-center gap-2 text-lg font-medium text-blue-800 mb-2">
            <FileText className="h-5 w-5" />
            Initial Assessment Summary
          </h3>
          <p className="text-blue-700 mb-4">{initialAssessment.summary}</p>
          
          <h4 className="text-sm font-medium text-blue-800 mb-1">Assessment Techniques Used:</h4>
          <ul className="list-disc list-inside text-blue-700 mb-4">
            {initialAssessment.techniques.map((technique, idx) => (
              <li key={idx}>{technique}</li>
            ))}
          </ul>
          
          <div className="text-xs text-blue-600">Conducted on {initialAssessment.date}</div>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {initialAssessment.keyFindings.map((section, idx) => (
            <AccordionItem key={idx} value={`section-${idx}`}>
              <AccordionTrigger className="text-gray-700 hover:text-blue-700">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {section.content.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-gray-600">{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <h3 className="flex items-center gap-2 font-medium text-amber-800 mb-3">
            <Quote className="h-4 w-4" />
            Client Quotes
          </h3>
          
          <div className="space-y-4">
            {initialAssessment.quotes.map((quote, idx) => (
              <div key={idx} className="bg-white p-3 rounded border border-amber-200">
                <p className="italic text-gray-700">"{quote.text}"</p>
                {quote.context && (
                  <p className="text-xs text-gray-500 mt-1">Context: {quote.context}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (reportType === 'deepDive' && deepDive) {
    return (
      <div className="space-y-6">
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h3 className="flex items-center gap-2 text-lg font-medium text-purple-800 mb-2">
            <Search className="h-5 w-5" />
            Deep Dive Assessment
          </h3>
          <p className="text-purple-700 mb-4">{deepDive.summary}</p>
          
          <h4 className="text-sm font-medium text-purple-800 mb-1">Techniques Used:</h4>
          <ul className="list-disc list-inside text-purple-700 mb-4">
            {deepDive.techniques.map((technique, idx) => (
              <li key={idx}>{technique}</li>
            ))}
          </ul>
          
          <div className="text-xs text-purple-600">Conducted on {deepDive.date}</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-green-800 font-medium mb-2">Strengths Identified</h3>
            <ul className="list-disc list-inside space-y-1">
              {deepDive.strengths.map((strength, idx) => (
                <li key={idx} className="text-green-700">{strength}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h3 className="text-amber-800 font-medium mb-2">Barriers to Progress</h3>
            <ul className="list-disc list-inside space-y-1">
              {deepDive.barriersIdentified.map((barrier, idx) => (
                <li key={idx} className="text-amber-700">{barrier}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {deepDive.insights.map((section, idx) => (
            <AccordionItem key={idx} value={`insight-${idx}`}>
              <AccordionTrigger className="text-gray-700 hover:text-purple-700">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {section.content.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-gray-600">{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h3 className="flex items-center gap-2 font-medium text-purple-800 mb-3">
            <Quote className="h-4 w-4" />
            Client Reflections
          </h3>
          
          <div className="space-y-4">
            {deepDive.quotes.map((quote, idx) => (
              <div key={idx} className="bg-white p-3 rounded border border-purple-200">
                <p className="italic text-gray-700">"{quote.text}"</p>
                {quote.context && (
                  <p className="text-xs text-gray-500 mt-1">Context: {quote.context}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (reportType === 'planning' && planningSession) {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="flex items-center gap-2 text-lg font-medium text-green-800 mb-2">
            <Calendar className="h-5 w-5" />
            Action Planning Session
          </h3>
          <p className="text-green-700 mb-4">{planningSession.summary}</p>
          
          <div className="text-xs text-green-600">Conducted on {planningSession.date}</div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Action Steps</h3>
          {planningSession.actionSteps.map((actionStep, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <h4 className="font-medium text-gray-800">{actionStep.title}</h4>
              </div>
              
              <div className="pl-10">
                <ul className="list-disc list-inside space-y-1 mb-3">
                  {actionStep.steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="text-gray-600">{step}</li>
                  ))}
                </ul>
                
                <div className="text-sm text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" /> 
                  Timeline: {actionStep.timeline}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Support Resources</h3>
            {planningSession.supportResources.map((resource, idx) => (
              <div key={idx} className="mb-4">
                <h4 className="text-md font-medium text-gray-700 mb-2">{resource.type}</h4>
                <ul className="list-disc list-inside space-y-1">
                  {resource.resources.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-gray-600">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Follow-up Schedule</h3>
            <div className="space-y-3">
              {planningSession.followUpSchedule.map((followUp, idx) => (
                <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded mr-3 text-sm">
                    {followUp.date}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">{followUp.focus}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return <div className="p-4 text-center text-gray-500">No report data available</div>;
};
