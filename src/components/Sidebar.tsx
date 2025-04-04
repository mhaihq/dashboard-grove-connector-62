
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Home, Calendar, ChevronRight, ChevronLeft, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ClinicalGuidelines } from '@/components/dashboard/intake';

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed
  const [isHovering, setIsHovering] = useState(false);
  const [showClinicalGuidelines, setShowClinicalGuidelines] = useState(false);
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Calendar, label: 'Schedule Followup', path: '/schedule-followup' },
    { icon: FileText, label: 'Health Journal', path: '/followup-report' },
    { icon: Stethoscope, label: 'Clinical Guidelines', path: '#', 
      action: () => setShowClinicalGuidelines(true) },
  ];

  useEffect(() => {
    // Listen for the custom event to open clinical guidelines
    const handleOpenClinicalGuidelines = () => {
      setIsCollapsed(false);
      setShowClinicalGuidelines(true);
    };
    
    document.addEventListener('open-clinical-guidelines', handleOpenClinicalGuidelines);
    
    return () => {
      document.removeEventListener('open-clinical-guidelines', handleOpenClinicalGuidelines);
    };
  }, []);

  const handleMouseEnter = () => {
    if (isCollapsed) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsed) {
      setIsHovering(false);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setIsHovering(false);
  };

  const closeClinicGuidelines = () => {
    setShowClinicalGuidelines(false);
  };

  const showExpanded = !isCollapsed || isHovering;
  const sidebarWidth = showExpanded ? "240px" : "70px";

  return (
    <>
      <div 
        className={cn(
          "h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-10 transition-all duration-300",
          showExpanded ? "w-[240px]" : "w-[70px]"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ width: sidebarWidth }}
      >
        <div className={cn(
          "p-4 border-b border-gray-100 flex items-center justify-center"
        )}>
          <img 
            src="https://cdn.prod.website-files.com/66d8df543029dd65661ce227/67ac8c50f043cf48b1a2116d_logoHana-p-500.png" 
            alt="Hana Logo" 
            className={cn(
              "object-contain transition-all duration-300",
              showExpanded ? "h-10" : "h-8"
            )}
          />
        </div>
        
        {showClinicalGuidelines ? (
          <div className="flex-1 overflow-auto">
            <div className="p-4 flex items-center">
              <button 
                onClick={closeClinicGuidelines}
                className="text-gray-500 hover:text-gray-700 mr-2"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-medium">Back to Navigation</span>
            </div>
            <ClinicalGuidelines />
          </div>
        ) : (
          <nav className="flex-1 p-4 space-y-1 overflow-hidden">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              const handleClick = (e) => {
                if (item.action) {
                  e.preventDefault();
                  item.action();
                }
              };
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 transition-all duration-300",
                    isActive ? "bg-hana-lightGreen text-hana-green font-medium" : "hover:bg-gray-50"
                  )}
                  onClick={handleClick}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-hana-green" : "text-gray-500")} />
                  {showExpanded && (
                    <span className="transition-opacity duration-300">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        )}
        
        <div className="p-4 border-t border-gray-100 flex justify-between items-center">
          <div className={cn(
            "text-xs text-gray-500 transition-opacity",
            showExpanded ? "opacity-100" : "opacity-0"
          )}>v1.0.0</div>
          <button 
            onClick={toggleSidebar} 
            className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? 
              <ChevronRight className="w-4 h-4" /> : 
              <ChevronLeft className="w-4 h-4" />
            }
          </button>
        </div>
      </div>
      
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      />
    </>
  );
};

export default Sidebar;
