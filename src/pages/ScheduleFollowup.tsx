
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import AppointmentScheduler from '@/components/AppointmentScheduler';

const ScheduleFollowup = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName="Alex Smith" userEmail="alex@example.com" />
      
      <main className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Schedule a Follow-up</h1>
        
        <AppointmentScheduler 
          name="Alex"
          appointmentTitle="Health Check-in"
          duration="30 minutes"
          features={[
            "Voice Call with Your Health Coach",
            "Personalized Assessment",
            "Confidential & Secure"
          ]}
          message="It's time for your follow-up appointment! Let's check on your progress and make any necessary adjustments to your health plan."
          callToAction="Please select a convenient time from the available slots."
        />
      </main>
    </div>
  );
};

export default ScheduleFollowup;
