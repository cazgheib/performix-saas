export interface Movement {
  id: string;
  name: string;
  description?: string;
  sets: number;
  reps?: number;
  weight?: number;
  time?: number;
  distance?: number;
  instructions?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  movements: Movement[];
  gymId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkoutRequest {
  name: string;
  description?: string;
  movements: Omit<Movement, 'id'>[];
}
