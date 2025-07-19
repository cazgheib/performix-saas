export interface WorkoutLog {
  id: string;
  userId: string;
  workoutId: string;
  gymId: string;
  classId?: string;
  results: MovementResult[];
  notes?: string;
  completedAt: Date;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MovementResult {
  movementId: string;
  reps?: number;
  sets?: number;
  weight?: number;
  time?: number;
  distance?: number;
  notes?: string;
}

export interface CreateWorkoutLogRequest {
  workoutId: string;
  classId?: string;
  results: MovementResult[];
  notes?: string;
  duration: number;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  score: number;
  rank: number;
  workoutName: string;
  completedAt: Date;
}
