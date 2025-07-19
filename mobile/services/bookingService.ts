const API_BASE_URL = 'http://localhost:3000';

export interface Booking {
  id: string;
  userId: string;
  classId: string;
  gymId: string;
  status: 'confirmed' | 'cancelled' | 'waitlist';
  bookedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingRequest {
  classId: string;
}

export const bookingService = {
  async createBooking(bookingData: CreateBookingRequest, token: string): Promise<Booking> {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error('Failed to create booking');
    }

    return response.json();
  },

  async getUserBookings(token: string): Promise<Booking[]> {
    const response = await fetch(`${API_BASE_URL}/bookings/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }

    return response.json();
  },

  async cancelBooking(bookingId: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
  },
};
