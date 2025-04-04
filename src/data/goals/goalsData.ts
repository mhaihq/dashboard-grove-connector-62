import { Goal } from "@/types/goals";

export const goals: Goal[] = [
  {
    id: "goal1",
    title: "Practice Mindfulness Daily",
    duration: "Short-Term",
    startDate: "2025-04-01",
    endDate: "2025-04-14",
    target: {
      count: 7,
      unit: "sessions/week"
    },
    progress: 5,
    category: "Lifestyle",
    source: "Hana Suggested",
    checkIns: [
      {
        date: "2025-04-01",
        note: "Hana Call: User started mindfulness practice"
      },
      {
        date: "2025-04-07",
        note: "Hana Call: User reported 5 sessions completed"
      }
    ],
    nudge: "You've completed 5 sessions so far this week. Try for 2 more before Sunday!",
    evidence: "Mindfulness-based cognitive therapy shows significant benefits for anxiety reduction",
    benefits: [
      "Reduced anxiety levels",
      "Improved focus throughout the day",
      "Better emotional regulation"
    ],
    difficulty: "hard",
    term: "short term"
  },
  {
    id: "goal2",
    title: "Maintain Regular Sleep Schedule",
    duration: "Medium-Term",
    startDate: "2025-03-25",
    endDate: "2025-04-25",
    target: {
      count: 8,
      unit: "hours/night"
    },
    progress: 6,
    category: "Lifestyle",
    source: "Personal",
    checkIns: [
      {
        date: "2025-03-25",
        note: "Hana Call: User wants to improve sleep schedule"
      },
      {
        date: "2025-04-10",
        note: "Hana Call: User achieving 6 hours consistently"
      }
    ],
    nudge: "You're getting closer to your target of 8 hours. Try going to bed 30 minutes earlier this week.",
    evidence: "Detected sleep pattern irregularities from voice sessions",
    benefits: [
      "More consistent energy levels",
      "Improved cognitive function",
      "Better mood regulation"
    ],
    difficulty: "hard",
    term: "medium term"
  },
  {
    id: "goal3",
    title: "Go to the Gym 2 times each week",
    duration: "Short-Term",
    startDate: "2025-04-01",
    endDate: "2025-04-14",
    target: {
      count: 4,
      unit: "visits total"
    },
    progress: 2,
    category: "Physical Health",
    source: "Personal",
    checkIns: [
      {
        date: "2025-04-07",
        note: "Hana Call: User reported 2 visits"
      }
    ],
    nudge: "You've visited 2 times so far this period. Try to go at least 1 more time before next week!",
    benefits: [
      "Improved physical strength",
      "Better cardiovascular health",
      "Increased energy levels"
    ],
    difficulty: "hard",
    term: "short term"
  },
  {
    id: "goal4",
    title: "Weekly Social Connection",
    duration: "Long-Term",
    startDate: "2025-04-01",
    endDate: "2025-06-01",
    target: {
      count: 1,
      unit: "meaningful interaction/week"
    },
    progress: 0,
    category: "Social",
    source: "Hana Suggested",
    description: "Schedule at least one meaningful social interaction per week",
    benefits: [
      "Strengthened support network",
      "Reduced feelings of isolation",
      "Improved mood and energy"
    ],
    difficulty: "hard",
    term: "medium term"
  },
  {
    id: "goal5",
    title: "Morning Mindfulness Routine",
    duration: "Medium-Term",
    startDate: "2025-04-15",
    endDate: "2025-05-15",
    target: {
      count: 10,
      unit: "minute sessions/day"
    },
    progress: 0,
    category: "Coping Skills",
    source: "Hana Suggested",
    description: "Start each day with a 10-minute mindfulness practice",
    benefits: [
      "Reduced anxiety levels",
      "Improved focus throughout the day",
      "Better emotional regulation"
    ],
    difficulty: "hard",
    term: "short term"
  },
  {
    id: "goal6",
    title: "Medication Adherence",
    duration: "Long-Term",
    startDate: "2025-04-01",
    endDate: "2025-07-01",
    target: {
      count: 1,
      unit: "dose/day"
    },
    progress: 7,
    category: "Medication",
    source: "Personal",
    checkIns: [
      {
        date: "2025-04-07",
        note: "Hana Call: User has taken medication daily for first week"
      }
    ],
    nudge: "Great job maintaining your medication routine! Keep the streak going.",
    benefits: [
      "Consistent therapeutic effects",
      "Reduced symptom fluctuations",
      "Better overall management"
    ],
    difficulty: "hard",
    term: "long term"
  },
  {
    id: "goal7",
    title: "Therapy Reflection Journal",
    duration: "Medium-Term",
    startDate: "2025-04-01",
    endDate: "2025-05-15",
    target: {
      count: 2,
      unit: "entries/week"
    },
    progress: 3,
    category: "Therapy",
    source: "Personal",
    checkIns: [
      {
        date: "2025-04-07",
        note: "Hana Call: User has completed 3 journal entries"
      }
    ],
    nudge: "Your journaling is helping track therapy insights. Try reflecting on patterns you're noticing.",
    benefits: [
      "Better retention of therapy concepts",
      "Increased self-awareness",
      "Improved ability to track progress"
    ],
    difficulty: "hard",
    term: "medium term"
  }
];

export const goalCategories = [
  "All Goals",
  "Lifestyle",
  "Therapy",
  "Medication",
  "Social",
  "Coping Skills",
  "Physical Health"
];

export const suggestedGoals: Partial<Goal>[] = [
  {
    id: "suggested1",
    title: "Morning Mindfulness Routine",
    category: "Coping Skills",
    description: "Start each day with a 10-minute mindfulness practice",
    benefits: [
      "Reduced anxiety levels",
      "Improved focus throughout the day",
      "Better emotional regulation"
    ],
    difficulty: "hard",
    term: "short term"
  },
  {
    id: "suggested2",
    title: "Weekly Social Connection",
    category: "Social",
    description: "Schedule at least one meaningful social interaction per week",
    benefits: [
      "Strengthened support network",
      "Reduced feelings of isolation",
      "Improved mood and energy"
    ],
    difficulty: "hard",
    term: "medium term"
  }
];
