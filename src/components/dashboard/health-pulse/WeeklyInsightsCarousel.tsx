
import React, { useState, useEffect } from 'react';
import { Info, Circle, CircleDot } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface WeeklyInsightsCarouselProps {
  insights: string[];
}

export const WeeklyInsightsCarousel: React.FC<WeeklyInsightsCarouselProps> = ({ insights }) => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [api, setApi] = useState<any>(null);
  
  // Auto-rotate carousel every 2 seconds
  useEffect(() => {
    if (!api || insights.length <= 1) return;
    
    const intervalId = setInterval(() => {
      const currentIndex = api.selectedScrollSnap();
      const nextIndex = (currentIndex + 1) % insights.length;
      api.scrollTo(nextIndex);
      setCurrentInsight(nextIndex);
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, [api, insights.length]);
  
  // Handle API setup for the carousel
  const handleApiChange = (newApi: any) => {
    if (!newApi) return;
    
    setApi(newApi);
    
    newApi.on("select", () => {
      setCurrentInsight(newApi.selectedScrollSnap());
    });
  };

  if (insights.length === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-gray-800">This Week's Key Patterns</h3>
        </div>
        
        <Carousel
          className="w-full"
          setApi={handleApiChange}
        >
          <CarouselContent>
            {insights.map((insight, index) => (
              <CarouselItem key={index}>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div>
                    <p className="text-blue-800 font-medium">
                      {insight}
                    </p>
                    <p className="mt-3 text-sm text-blue-700">
                      This was mentioned in 3 of your last 4 calls.
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        {/* Carousel indicators (dots) */}
        <div className="flex items-center justify-center mt-3">
          {insights.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className="mx-1 focus:outline-none"
            >
              {index === currentInsight ? (
                <CircleDot className="w-4 h-4 text-blue-600" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300" />
              )}
            </button>
          ))}
        </div>
        
        <div className="mt-3 text-xs text-gray-500 text-center">
          Pattern origin: Based on voice conversation & streak data
        </div>
      </div>
    </TooltipProvider>
  );
};

export default WeeklyInsightsCarousel;
