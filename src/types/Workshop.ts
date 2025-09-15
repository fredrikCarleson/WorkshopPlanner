export interface LiberatingStructure {
  id: string;
  name: string;
  category: string;
  baseTime: number; // minutes for base number of participants
  scalingFactor: number; // how time scales with participants
  minParticipants: number;
  maxParticipants: number;
  description: string;
  instructions: string;
  icon: string;
}

export interface WorkshopSession {
  id: string;
  structure: LiberatingStructure;
  duration: number; // actual duration in minutes
  startTime: string;
  endTime: string;
  purpose: string;
  output: string;
  transition: string;
  phase: 'Open' | 'Diverge' | 'Explore' | 'Converge' | 'Commit';
  risks: string;
  mitigation: string;
  isBreak?: boolean;
  session?: WorkshopSession;
  breakType?: 'short' | 'long';
  customData?: {
    title?: string;
    description?: string;
    instructions?: string;
    purpose?: string;
    output?: string;
    transition?: string;
    risks?: string;
    mitigation?: string;
  };
  isCustomized?: boolean;
}

export interface Workshop {
  id: string;
  title: string;
  duration: number; // hours
  participants: number;
  purposes: string[];
  context: string;
  goals: string;
  sessions: WorkshopSession[];
  totalTime: number; // minutes
  startTime: string; // Format: "HH:MM" (e.g., "08:00")
}

export interface FormData {
  hours: number;
  participants: number;
  purposes: string[];
  context: string;
  goals: string;
  startTime: string; // Format: "HH:MM" (e.g., "08:00")
}

export interface SavedWorkshop {
  id: string;
  name: string;
  createdAt: Date;
  lastModified: Date;
  status: 'draft' | 'completed';
  formData?: FormData;
  workshop?: Workshop;
  url: string;
}