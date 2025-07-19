export interface Class {
  id: string;
  gymId: string;
  name: string;
  description: string;
  coachId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  maxCapacity: number;
  currentBookings: number;
  classType: string;
  workoutId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClassRequest {
  name: string;
  description: string;
  coachId: string;
  date: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  classType: string;
  workoutId?: string;
}
