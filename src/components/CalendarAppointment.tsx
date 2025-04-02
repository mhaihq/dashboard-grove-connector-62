
import React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PhoneCall, PhoneMissed, Clock, Repeat, Calendar, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarAppointmentProps {
  date: Date;
  time: string;
  status: 'booked' | 'missed';
  recurrenceType?: string;
  recurrenceFrequency?: string;
}

export const CalendarAppointment: React.FC<CalendarAppointmentProps> = ({
  date,
  time,
  status,
  recurrenceType,
  recurrenceFrequency
}) => {
  const isPast = date < new Date();
  const isToday = new Date().toDateString() === date.toDateString();
  
  const getStatusIcon = () => {
    if (status === 'missed') return <PhoneMissed className="h-5 w-5 text-red-500" />;
    if (isToday) return <Bell className="h-5 w-5 text-amber-500" />;
    return <PhoneCall className="h-5 w-5 text-green-500" />;
  };
  
  const getStatusText = () => {
    if (status === 'missed') return 'Missed Call';
    if (isToday) return 'Today\'s Appointment';
    if (isPast) return 'Completed';
    return 'Upcoming';
  };

  return (
    <div className={cn(
      "border rounded-lg p-4 transition-all hover:shadow-md",
      status === 'missed' ? "border-red-200 bg-red-50" : 
      isToday ? "border-amber-200 bg-amber-50" :
      isPast ? "border-gray-200 bg-gray-50" : "border-green-200 bg-green-50"
    )}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          {getStatusIcon()}
          <span className={cn(
            "ml-2 text-sm font-medium px-2 py-0.5 rounded-full",
            status === 'missed' ? "bg-red-100 text-red-800" : 
            isToday ? "bg-amber-100 text-amber-800" :
            isPast ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"
          )}>
            {getStatusText()}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-700">
          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
          <span>{format(date, 'MMMM d, yyyy')}</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <Clock className="h-4 w-4 mr-2 text-gray-500" />
          <span>{time}</span>
        </div>
        
        {recurrenceType === 'recurring' && recurrenceFrequency && (
          <div className="flex items-center text-gray-700">
            <Repeat className="h-4 w-4 mr-2 text-gray-500" />
            <span>Repeats {recurrenceFrequency}</span>
          </div>
        )}
      </div>
      
      {!isPast && status !== 'missed' && (
        <div className="mt-3 flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-300 text-gray-700"
          >
            Reschedule
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            Cancel
          </Button>
        </div>
      )}
      
      {status === 'missed' && (
        <div className="mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-green-300 text-green-700 hover:bg-green-50"
          >
            <PhoneCall className="h-4 w-4 mr-2" />
            Reschedule
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalendarAppointment;
