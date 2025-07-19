export interface Class {
  id: string;
  gymId: string;
  name: string;
  description?: string;
  coachId: string;
  workoutId?: string;
  date: Date;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  currentBookings: number;
  waitlistCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClassInput {
  gymId: string;
  name: string;
  description?: string;
  coachId: string;
  workoutId?: string;
  date: Date;
  startTime: string;
  endTime: string;
  maxCapacity: number;
}

export interface UpdateClassInput {
  name?: string;
  description?: string;
  coachId?: string;
  workoutId?: string;
  date?: Date;
  startTime?: string;
  endTime?: string;
  maxCapacity?: number;
  isActive?: boolean;
}
