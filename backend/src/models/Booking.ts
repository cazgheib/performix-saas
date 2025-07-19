export interface Booking {
  id: string;
  userId: string;
  classId: string;
  gymId: string;
  status: 'confirmed' | 'waitlist' | 'cancelled';
  attendanceStatus?: 'pending' | 'attended' | 'no-show';
  bookedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingRequest {
  classId: string;
}

export interface BookingWithDetails extends Booking {
  className: string;
  classDate: Date;
  classTime: string;
  coachName: string;
}
