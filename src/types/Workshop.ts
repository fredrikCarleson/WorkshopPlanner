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
  isBreak?: boolean;
  breakType?: 'short' | 'long';
}

export interface Workshop {
  duration: number; // hours
  participants: number;
  purposes: string[];
  sessions: WorkshopSession[];
  totalTime: number; // minutes
}