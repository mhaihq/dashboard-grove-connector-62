
import { FormattedGoal, Goal } from "@/types/goals";

// Updated to match the database schema
export const goals: FormattedGoal[] = [
  {
    id: 1,
    user_id: 1,
    title: "Practice Mindfulness Daily",
    duration_type: "SHORT",
    start_date: "2025-04-01",
    end_date: "2025-04-14",
    target: 7,
    progress: 5,
    description: "Practice mindfulness meditation for at least 10 minutes each day",
    origin: "HANA",
    status: "ACTIVE",
    created_at: "2025-04-01T00:00:00Z",
    updated_at: "2025-04-07T00:00:00Z",
    // UI specific properties
    category: "Lifestyle",
    source: "Hana Suggested",
    difficulty: "hard"
  },
  {
    id: 2,
    user_id: 1,
    title: "Maintain Regular Sleep Schedule",
    duration_type: "MEDIUM",
    start_date: "2025-03-25",
    end_date: "2025-04-25",
    target: 8,
    progress: 6,
    description: "Go to bed and wake up at consistent times to achieve 8 hours of sleep",
    origin: "PATIENT",
    status: "ACTIVE",
    created_at: "2025-03-25T00:00:00Z",
    updated_at: "2025-04-10T00:00:00Z",
    // UI specific properties
    category: "Lifestyle",
    source: "Personal",
    difficulty: "hard"
  },
  {
    id: 3,
    user_id: 1,
    title: "Go to the Gym 2 times each week",
    duration_type: "SHORT",
    start_date: "2025-04-01",
    end_date: "2025-04-14",
    target: 4,
    progress: 2,
    description: "Visit the gym and complete a full workout session twice weekly",
    origin: "PATIENT",
    status: "ACTIVE",
    created_at: "2025-04-01T00:00:00Z",
    updated_at: "2025-04-07T00:00:00Z",
    // UI specific properties
    category: "Physical Health",
    source: "Personal",
    difficulty: "hard"
  },
  {
    id: 4,
    user_id: 1,
    title: "Weekly Social Connection",
    duration_type: "LONG",
    start_date: "2025-04-01",
    end_date: "2025-06-01",
    target: 8,
    progress: 0,
    description: "Schedule at least one meaningful social interaction per week",
    origin: "HANA",
    status: "ACTIVE",
    created_at: "2025-04-01T00:00:00Z",
    updated_at: "2025-04-01T00:00:00Z",
    // UI specific properties
    category: "Social",
    source: "Hana Suggested",
    difficulty: "hard"
  },
  {
    id: 5,
    user_id: 1,
    title: "Morning Mindfulness Routine",
    duration_type: "MEDIUM",
    start_date: "2025-04-15",
    end_date: "2025-05-15",
    target: 10,
    progress: 0,
    description: "Start each day with a 10-minute mindfulness practice",
    origin: "HANA",
    status: "ACTIVE",
    created_at: "2025-04-15T00:00:00Z",
    updated_at: "2025-04-15T00:00:00Z",
    // UI specific properties
    category: "Coping Skills",
    source: "Hana Suggested",
    difficulty: "hard"
  },
  {
    id: 6,
    user_id: 1,
    title: "Medication Adherence",
    duration_type: "LONG",
    start_date: "2025-04-01",
    end_date: "2025-07-01",
    target: 30,
    progress: 7,
    description: "Take prescribed medication daily without missing doses",
    origin: "PATIENT",
    status: "ACTIVE",
    created_at: "2025-04-01T00:00:00Z",
    updated_at: "2025-04-07T00:00:00Z",
    // UI specific properties
    category: "Medication",
    source: "Personal",
    difficulty: "hard"
  },
  {
    id: 7,
    user_id: 1,
    title: "Therapy Reflection Journal",
    duration_type: "MEDIUM",
    start_date: "2025-04-01",
    end_date: "2025-05-15",
    target: 12,
    progress: 3,
    description: "Write therapy reflections twice weekly to track insights and progress",
    origin: "PATIENT",
    status: "ACTIVE",
    created_at: "2025-04-01T00:00:00Z",
    updated_at: "2025-04-07T00:00:00Z",
    // UI specific properties
    category: "Therapy",
    source: "Personal",
    difficulty: "hard"
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

export const suggestedGoals: Partial<FormattedGoal>[] = [
  {
    id: 101,
    title: "Morning Mindfulness Routine",
    category: "Coping Skills",
    description: "Start each day with a 10-minute mindfulness practice",
    difficulty: "hard",
    origin: "HANA"
  },
  {
    id: 102,
    title: "Weekly Social Connection",
    category: "Social",
    description: "Schedule at least one meaningful social interaction per week",
    difficulty: "hard",
    origin: "HANA"
  }
];
