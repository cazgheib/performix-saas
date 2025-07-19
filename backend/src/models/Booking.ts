export interface Booking {
  id: string;
  userId: string;
  classId: string;
  gymId: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled' | 'attended' | 'no-show';
  position?: number; // For waitlist
  bookedAt: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingInput {
  userId: string;
  classId: string;
  gymId: string;
}

export interface UpdateBookingInput {
  status?: 'confirmed' | 'waitlisted' | 'cancelled' | 'attended' | 'no-show';
  position?: number;
}
