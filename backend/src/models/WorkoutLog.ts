export interface WorkoutLog {
  id: string;
  userId: string;
  workoutId: string;
  classId?: string;
  gymId: string;
  completedAt: Date;
  duration?: number; // actual duration in minutes
  score?: number;
  scoreType: 'time' | 'reps' | 'weight' | 'rounds' | 'distance' | 'none';
  notes?: string;
  movements: WorkoutLogMovement[];
  isPersonalRecord: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutLogMovement {
  id: string;
  movementId: string;
  actualReps?: number;
  actualSets?: number;
  actualWeight?: number;
  actualDistance?: number;
  actualDuration?: number;
  notes?: string;
}

export interface CreateWorkoutLogInput {
  userId: string;
  workoutId: string;
  classId?: string;
  gymId: string;
  duration?: number;
  score?: number;
  scoreType: 'time' | 'reps' | 'weight' | 'rounds' | 'distance' | 'none';
  notes?: string;
  movements: Omit<WorkoutLogMovement, 'id'>[];
}

export interface UpdateWorkoutLogInput {
  duration?: number;
  score?: number;
  notes?: string;
  movements?: Omit<WorkoutLogMovement, 'id'>[];
}
