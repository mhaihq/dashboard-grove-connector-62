
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Goals from "./pages/Goals";
import ScheduleFollowup from "./pages/ScheduleFollowup";
import FollowupReport from "./pages/FollowupReport";
import ClinicalGuidelines from "./pages/ClinicalGuidelines";
import Intake from "./pages/Intake";
import IntakeReport from "./pages/IntakeReport";
import IntakeInitialReport from "./pages/IntakeInitialReport";
import IntakeDeepDiveReport from "./pages/IntakeDeepDiveReport";
import IntakePlanningReport from "./pages/IntakePlanningReport";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import './App.css'; // Keep styles

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/clinical-guidelines" element={<ClinicalGuidelines />} />
              <Route path="/schedule-followup" element={<ScheduleFollowup />} />
              <Route path="/followup-report" element={<FollowupReport />} />
              <Route path="/intake" element={<Intake />} />
              <Route path="/intake-report" element={<IntakeReport />} />
              <Route path="/intake-report/initial" element={<IntakeInitialReport />} />
              <Route path="/intake-report/deep-dive" element={<IntakeDeepDiveReport />} />
              <Route path="/intake-report/planning" element={<IntakePlanningReport />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
