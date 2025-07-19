export interface Workout {
  id: string;
  gymId: string;
  createdBy: string; // userId of coach/admin who created it
  name: string;
  description?: string;
  type: 'strength' | 'cardio' | 'crossfit' | 'yoga' | 'pilates' | 'other';
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string;
  videoUrl?: string;
  imageUrl?: string;
  movements: WorkoutMovement[];
  scoringType: 'time' | 'reps' | 'weight' | 'rounds' | 'distance' | 'none';
  isTemplate: boolean;
  isPublic: boolean; // For marketplace
  price?: number; // For marketplace
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutMovement {
  id: string;
  name: string;
  reps?: number;
  sets?: number;
  weight?: number;
  distance?: number;
  duration?: number; // in seconds
  restTime?: number; // in seconds
  instructions?: string;
  videoUrl?: string;
  order: number;
}

export interface CreateWorkoutInput {
  gymId: string;
  createdBy: string;
  name: string;
  description?: string;
  type: 'strength' | 'cardio' | 'crossfit' | 'yoga' | 'pilates' | 'other';
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string;
  videoUrl?: string;
  imageUrl?: string;
  movements: Omit<WorkoutMovement, 'id'>[];
  scoringType: 'time' | 'reps' | 'weight' | 'rounds' | 'distance' | 'none';
  isTemplate: boolean;
  isPublic?: boolean;
  price?: number;
}

export interface UpdateWorkoutInput {
  name?: string;
  description?: string;
  type?: 'strength' | 'cardio' | 'crossfit' | 'yoga' | 'pilates' | 'other';
  duration?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  instructions?: string;
  videoUrl?: string;
  imageUrl?: string;
  movements?: Omit<WorkoutMovement, 'id'>[];
  scoringType?: 'time' | 'reps' | 'weight' | 'rounds' | 'distance' | 'none';
  isTemplate?: boolean;
  isPublic?: boolean;
  price?: number;
  isActive?: boolean;
}
