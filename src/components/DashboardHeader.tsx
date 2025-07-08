
import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface DashboardHeaderProps {
  userName: string;
  userEmail?: string;
  userImage?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  userEmail,
  userImage,
}) => {
  return (
    <header className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white animate-fade-in">
      <div className="flex items-center">
        <img src="/lovable-uploads/4311b229-3c37-4091-98f7-da7e5245ec5c.png" alt="Hana" className="h-8" />
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">
          <Globe className="w-4 h-4" />
          <span>English</span>
          <ChevronDown className="w-3 h-3" />
        </div>
        
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 bg-hana-green">
            <AvatarImage 
              src={userImage} 
              alt={userName} 
            />
            <AvatarFallback className="bg-hana-green text-white">
              {userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">{userName}</div>
            {userEmail && <div className="text-xs text-gray-500">{userEmail}</div>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
