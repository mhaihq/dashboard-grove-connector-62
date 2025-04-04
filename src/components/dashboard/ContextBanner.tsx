
import React from 'react';
import { Info, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContextItem {
  text: string;
  type?: 'info' | 'warning' | 'success' | 'neutral';
}

interface ContextBannerProps {
  title: string;
  items: ContextItem[] | string[];
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral';
  date?: string;
}

export const ContextBanner: React.FC<ContextBannerProps> = ({ 
  title, 
  items,
  icon = <Info className="h-5 w-5 text-blue-600" />,
  variant = 'primary',
  date
}) => {
  // Determine styling based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return "bg-blue-50 border-blue-100 text-blue-700";
      case 'secondary':
        return "bg-amber-50 border-amber-100 text-amber-700";
      case 'neutral':
        return "bg-gray-50 border-gray-100 text-gray-700";
      default:
        return "bg-blue-50 border-blue-100 text-blue-700";
    }
  };

  return (
    <div className={cn("border rounded-lg p-4 mb-5", getVariantStyles())}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-medium">{title}</h3>
        </div>
        {date && (
          <div className="flex items-center text-xs opacity-70">
            <Clock className="h-3 w-3 mr-1" />
            <span>{date}</span>
          </div>
        )}
      </div>
      
      <ul className="space-y-1 pl-6">
        {items.map((item, index) => {
          const itemText = typeof item === 'string' ? item : item.text;
          const itemType = typeof item === 'string' ? 'neutral' : item.type || 'neutral';
          
          return (
            <li key={index} className="text-sm">
              {itemText}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContextBanner;
