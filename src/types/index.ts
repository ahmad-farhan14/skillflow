export type RoadmapCategory = "Development" | "Design";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  current_streak: number;
  last_active_date: string; // ISO date string (YYYY-MM-DD)
  created_at: string;
  weekly_activity?: { [date: string]: boolean };
}

export type TopicDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Topic {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  resource_url?: string;
  video_url?: string;
  resource_label?: string;
  order_index: number;
  estimated_minutes?: number;
  difficulty?: TopicDifficulty;
  is_completed: boolean;
  completed_at?: string | null;
  key_takeaways?: string[];
}

export interface Module {
  id: string;
  roadmap_id: string;
  title: string;
  description: string;
  order_index: number;
  created_at?: string;
  topics: Topic[];
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: RoadmapCategory;
  icon: string;
  estimated_hours: number;
  level: "Beginner Friendly" | "Intermediate" | "Career Track";
  created_at?: string;
  modules: Module[];
}

export interface UserProgressRecord {
  id: string;
  user_id: string;
  topic_id: string;
  is_completed: boolean;
  completed_at: string | null;
}

export interface Note {
  id: string;
  user_id: string;
  roadmap_id: string;
  module_id: string | null;
  content: string;
  updated_at: string;
  created_at: string;
}

export interface RoadmapStats {
  totalTopics: number;
  completedTopics: number;
  completionPercentage: number;
  estimatedHours: number;
  completedHours: number;
  totalModules: number;
  completedModules: number;
}
