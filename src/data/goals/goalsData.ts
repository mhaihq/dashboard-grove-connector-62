
import { Goal } from "@/types/goals";

export const goals: Goal[] = [
  {
    id: 1,
    user_id: 101,
    title: "Practice Mindfulness Daily",
    description: "Start each day with a 10-minute mindfulness practice",
    duration_type: "SHORT",
    start_date: "2025-04-01",
    end_date: "2025-04-14",
    target: 7,
    progress: 5,
    origin: "HANA",
    status: "ACTIVE",
    created_at: "2025-03-30T10:00:00Z",
    updated_at: "2025-04-07T15:30:00Z"
  },
  {
    id: 2,
    user_id: 101,
    title: "Maintain Regular Sleep Schedule",
    description: "Aim for 8 hours of sleep each night",
    duration_type: "MEDIUM",
    start_date: "2025-03-25",
    end_date: "2025-04-25",
    target: 8,
    progress: 6,
    origin: "PATIENT",
    status: "ACTIVE",
    created_at: "2025-03-24T09:15:00Z",
    updated_at: "2025-04-10T14:20:00Z"
  },
  {
    id: 3,
    user_id: 101,
    title: "Go to the Gym 2 times each week",
    description: "Regular exercise routine focusing on cardio and strength",
    duration_type: "SHORT",
    start_date: "2025-04-01",
    end_date: "2025-04-14",
    target: 4,
    progress: 2,
    origin: "PATIENT",
    status: "ACTIVE",
    created_at: "2025-03-31T11:30:00Z",
    updated_at: "2025-04-07T10:45:00Z"
  },
  {
    id: 4,
    user_id: 101,
    title: "Weekly Social Connection",
    description: "Schedule at least one meaningful social interaction per week",
    duration_type: "LONG",
    start_date: "2025-04-01",
    end_date: "2025-06-01",
    target: 8,
    progress: 0,
    origin: "HANA",
    status: "ACTIVE",
    created_at: "2025-03-30T16:40:00Z",
    updated_at: "2025-03-30T16:40:00Z"
  },
  {
    id: 5,
    user_id: 101,
    title: "Morning Mindfulness Routine",
    description: "Start each day with a 10-minute mindfulness practice",
    duration_type: "MEDIUM",
    start_date: "2025-04-15",
    end_date: "2025-05-15",
    target: 30,
    progress: 0,
    origin: "HANA",
    status: "ACTIVE",
    created_at: "2025-04-10T08:20:00Z",
    updated_at: "2025-04-10T08:20:00Z"
  },
  {
    id: 6,
    user_id: 101,
    title: "Medication Adherence",
    description: "Take prescribed medication daily as directed",
    duration_type: "LONG",
    start_date: "2025-04-01",
    end_date: "2025-07-01",
    target: 90,
    progress: 7,
    origin: "PATIENT",
    status: "ACTIVE",
    created_at: "2025-03-29T09:10:00Z",
    updated_at: "2025-04-07T20:15:00Z"
  },
  {
    id: 7,
    user_id: 101,
    title: "Therapy Reflection Journal",
    description: "Write therapy reflection entries twice weekly",
    duration_type: "MEDIUM",
    start_date: "2025-04-01",
    end_date: "2025-05-15",
    target: 12,
    progress: 3,
    origin: "PATIENT",
    status: "ACTIVE",
    created_at: "2025-03-30T15:25:00Z",
    updated_at: "2025-04-07T19:50:00Z"
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

// These are formatted for UI display purposes
export const suggestedGoals: Partial<Goal>[] = [
  {
    id: 101,
    title: "Morning Mindfulness Routine",
    description: "Start each day with a 10-minute mindfulness practice",
    duration_type: "SHORT",
    target: 10,
    origin: "HANA"
  },
  {
    id: 102,
    title: "Weekly Social Connection",
    description: "Schedule at least one meaningful social interaction per week",
    duration_type: "MEDIUM",
    target: 4,
    origin: "HANA"
  }
];

// For compatibility with existing UI components
export const formattedGoals = goals.map(goal => ({
  ...goal,
  category: goal.id % 2 === 0 ? "Lifestyle" : "Physical Health", 
  difficulty: "hard" as const,
  term: goal.duration_type === "SHORT" ? "short term" as const : 
        goal.duration_type === "MEDIUM" ? "medium term" as const : 
        "long term" as const,
  source: goal.origin === "HANA" ? "Hana Suggested" : "Personal" as const
}));
