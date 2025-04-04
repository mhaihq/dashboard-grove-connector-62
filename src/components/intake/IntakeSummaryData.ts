
import React from 'react';

export interface MetricItem {
  title: string;
  value?: number;
  description: string;
  icon?: React.ReactNode;
  status: 'positive' | 'mixed' | 'concerning';
  change?: string;
  insights?: string[];
}

export interface SummaryItem {
  title: string;
  content: string;
  type: 'notable' | 'joy' | 'weighing';
}

export interface Recommendation {
  title: string;
  description: string;
  actionItems: string[];
  steps: string[];
  priority: 'high' | 'medium' | 'low';
  relatedAreas?: string[];
  timeframe?: string;
  difficulty?: 'easy' | 'moderate' | 'challenging';
}

export function getIntakeData() {
  const summaryItems: SummaryItem[] = [
    {
      title: "Key Observations",
      content: "Matteo exhibits moderate anxiety symptoms that impact his sleep quality and energy levels. He reports feeling overwhelmed by work responsibilities and struggles to maintain consistent exercise habits. His nutritional habits are relatively balanced, but inconsistent meal timing affects his energy regulation.",
      type: 'notable'
    },
    {
      title: "Self-Reported Strengths",
      content: "Matteo shows high motivation for health improvement and has previously maintained an exercise routine successfully for over 6 months. He has good social support from family and friends. He demonstrates strong self-awareness about his health patterns and triggers for stress.",
      type: 'joy'
    },
    {
      title: "Identified Challenges",
      content: "Sleep disruption appears to be a central issue affecting overall wellbeing. Work-related stress management and difficulty establishing consistent routines are contributing to health challenges. Time management was identified as a barrier to maintaining healthy habits.",
      type: 'weighing'
    },
    {
      title: "Client Priorities",
      content: "Matteo expressed strong interest in improving sleep quality and developing sustainable stress management techniques. He seeks to rebuild a consistent exercise routine that fits his current lifestyle. He's also interested in exploring mindfulness practices for anxiety reduction.",
      type: 'joy'
    }
  ];

  const metrics: MetricItem[] = [
    {
      title: "Sleep Quality",
      value: 4,
      description: "Reports difficulty falling asleep and staying asleep, with an average of 5-6 hours per night.",
      status: 'concerning'
    },
    {
      title: "Stress Management",
      value: 3,
      description: "Experiences regular stress with limited coping mechanisms. Work is a primary stressor.",
      status: 'concerning'
    },
    {
      title: "Physical Activity",
      value: 2,
      description: "Currently exercises 1-2 times per week, inconsistently. Previously maintained regular routine.",
      status: 'concerning'
    },
    {
      title: "Nutrition Habits",
      value: 6,
      description: "Generally makes healthy food choices but meal timing is irregular and sometimes skips meals.",
      status: 'mixed'
    },
    {
      title: "Energy Level",
      value: 4,
      description: "Reports moderate fatigue, especially in afternoons, affecting productivity and motivation.",
      status: 'mixed'
    },
    {
      title: "Emotional Regulation",
      value: 5,
      description: "Experiences anxiety but generally manages day-to-day emotional challenges.",
      status: 'mixed'
    },
    {
      title: "Social Support",
      value: 7,
      description: "Has reliable support system but doesn't always utilize it when struggling.",
      status: 'positive'
    },
    {
      title: "Cognitive Function",
      value: 6,
      description: "Reports occasional difficulty concentrating and mental fatigue, possibly related to sleep issues.",
      status: 'mixed'
    },
    {
      title: "Hydration",
      value: 5,
      description: "Consumes approximately 5-6 glasses of water daily, below recommended amount.",
      status: 'mixed'
    }
  ];

  const recommendations: Recommendation[] = [
    {
      title: "Sleep Optimization",
      description: "Establishing consistent sleep patterns will likely improve energy, mood, and cognitive function.",
      actionItems: [
        "Develop a wind-down routine 30-60 minutes before bed",
        "Limit screen time 1 hour before sleep",
        "Create a comfortable sleep environment (temperature, light, noise)",
        "Maintain consistent sleep/wake times, even on weekends"
      ],
      steps: [
        "Develop a wind-down routine 30-60 minutes before bed",
        "Limit screen time 1 hour before sleep",
        "Create a comfortable sleep environment (temperature, light, noise)",
        "Maintain consistent sleep/wake times, even on weekends"
      ],
      priority: 'high',
      relatedAreas: ["Sleep", "Energy Level", "Mood"],
      timeframe: "Start within 2 days",
      difficulty: "moderate"
    },
    {
      title: "Stress Management",
      description: "Implementing daily stress reduction techniques can reduce anxiety and improve sleep quality.",
      actionItems: [
        "Practice 10 minutes of mindfulness meditation daily",
        "Identify and implement boundaries for work-related stress",
        "Schedule brief breaks throughout workday for stress reset",
        "Explore progressive muscle relaxation for physical tension"
      ],
      steps: [
        "Practice 10 minutes of mindfulness meditation daily",
        "Identify and implement boundaries for work-related stress",
        "Schedule brief breaks throughout workday for stress reset",
        "Explore progressive muscle relaxation for physical tension"
      ],
      priority: 'medium',
      relatedAreas: ["Stress", "Sleep Quality"],
      timeframe: "Begin within 3 days",
      difficulty: "moderate"
    },
    {
      title: "Physical Activity Integration",
      description: "Gradually rebuilding consistent exercise habits will support energy, mood, and stress management.",
      actionItems: [
        "Start with 20-minute sessions 3x/week of enjoyable activity",
        "Schedule exercise sessions in calendar as non-negotiable time",
        "Identify backup activities for days when primary exercise isn't possible",
        "Focus on consistency rather than intensity initially"
      ],
      steps: [
        "Start with 20-minute sessions 3x/week of enjoyable activity",
        "Schedule exercise sessions in calendar as non-negotiable time",
        "Identify backup activities for days when primary exercise isn't possible",
        "Focus on consistency rather than intensity initially"
      ],
      priority: 'medium',
      relatedAreas: ["Physical Activity", "Energy", "Stress"],
      timeframe: "Begin within 1 week",
      difficulty: "moderate"
    }
  ];

  return {
    summaryItems,
    metrics,
    recommendations
  };
}
