const API_BASE_URL = 'http://localhost:3000';

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

export interface CreateWorkoutRequest {
  name: string;
  description?: string;
  movements: Omit<Movement, 'id'>[];
}

export const workoutService = {
  async getWorkouts(token: string): Promise<Workout[]> {
    const response = await fetch(`${API_BASE_URL}/workouts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch workouts');
    }

    return response.json();
  },

  async createWorkout(workoutData: CreateWorkoutRequest, token: string): Promise<Workout> {
    const response = await fetch(`${API_BASE_URL}/workouts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workoutData),
    });

    if (!response.ok) {
      throw new Error('Failed to create workout');
    }

    return response.json();
  },

  async getWorkout(workoutId: string, token: string): Promise<Workout> {
    const response = await fetch(`${API_BASE_URL}/workouts/${workoutId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch workout');
    }

    return response.json();
  },

  async updateWorkout(workoutId: string, updates: Partial<CreateWorkoutRequest>, token: string): Promise<Workout> {
    const response = await fetch(`${API_BASE_URL}/workouts/${workoutId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update workout');
    }

    return response.json();
  },

  async deleteWorkout(workoutId: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/workouts/${workoutId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete workout');
    }
  },
};
