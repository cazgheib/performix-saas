import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Booking, CreateBookingRequest } from '../models/Booking';
import { AuthRequest } from '../middleware/auth';
import { classes } from './classController';

const bookings: Booking[] = [];

export const createBooking = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { classId }: CreateBookingRequest = req.body;
    const userId = req.user?.id;
    const gymId = req.user?.gymId;

    if (!userId || !gymId) {
      return res.status(400).json({ error: 'User ID and Gym ID required' });
    }

    const classItem = classes.find(c => c.id === classId && c.gymId === gymId);
    if (!classItem) {
      return res.status(404).json({ error: 'Class not found' });
    }

    if (classItem.currentBookings >= classItem.maxCapacity) {
      return res.status(400).json({ error: 'Class is full' });
    }

    const existingBooking = bookings.find(b => b.classId === classId && b.userId === userId);
    if (existingBooking) {
      return res.status(400).json({ error: 'Already booked for this class' });
    }

    const newBooking: Booking = {
      id: uuidv4(),
      userId,
      classId,
      gymId,
      status: 'confirmed',
      bookedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    bookings.push(newBooking);
    classItem.currentBookings += 1;

    return res.status(201).json(newBooking);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserBookings = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.id;
    const gymId = req.user?.gymId;

    if (!userId || !gymId) {
      return res.status(400).json({ error: 'User ID and Gym ID required' });
    }

    const userBookings = bookings.filter(b => b.userId === userId && b.gymId === gymId);
    return res.json(userBookings);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const gymId = req.user?.gymId;

    const bookingIndex = bookings.findIndex(b => b.id === id && b.userId === userId && b.gymId === gymId);
    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const booking = bookings[bookingIndex];
    const classItem = classes.find(c => c.id === booking.classId);
    if (classItem) {
      classItem.currentBookings -= 1;
    }

    bookings.splice(bookingIndex, 1);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { bookings };
