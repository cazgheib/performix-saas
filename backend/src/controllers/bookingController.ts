import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../middleware/auth';
import { Booking, CreateBookingInput } from '../models/Booking';
import { Class } from '../models/Class';

const bookings: Booking[] = [];
const classes: Class[] = [];

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { classId, gymId } = req.body;
    const userId = req.user!.id;

    const classDetails = classes.find(c => c.id === classId && c.gymId === gymId);
    if (!classDetails) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    const existingBooking = bookings.find(b => 
      b.userId === userId && b.classId === classId && 
      ['confirmed', 'waitlisted'].includes(b.status)
    );
    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'Already booked this class' });
    }

    const confirmedBookings = bookings.filter(b => 
      b.classId === classId && b.status === 'confirmed'
    ).length;

    const status = confirmedBookings < classDetails.maxCapacity ? 'confirmed' : 'waitlisted';
    const position = status === 'waitlisted' ? 
      bookings.filter(b => b.classId === classId && b.status === 'waitlisted').length + 1 : 
      undefined;

    const newBooking: Booking = {
      id: uuidv4(),
      userId,
      classId,
      gymId,
      status,
      position,
      bookedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    bookings.push(newBooking);

    const classIndex = classes.findIndex(c => c.id === classId);
    if (classIndex !== -1) {
      if (status === 'confirmed') {
        classes[classIndex].currentBookings++;
      } else {
        classes[classIndex].waitlistCount++;
      }
    }

    res.status(201).json({
      success: true,
      booking: newBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getBookings = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { userId, gymId, status, date } = req.query;

    let filteredBookings = bookings.filter(b => b.gymId === gymId);

    if (req.user?.role === 'athlete') {
      filteredBookings = filteredBookings.filter(b => b.userId === req.user?.id);
    } else if (userId) {
      filteredBookings = filteredBookings.filter(b => b.userId === userId);
    }

    if (status) {
      filteredBookings = filteredBookings.filter(b => b.status === status);
    }

    if (date) {
      const filterDate = new Date(date as string);
      filteredBookings = filteredBookings.filter(b => {
        const classDetails = classes.find(c => c.id === b.classId);
        return classDetails && classDetails.date.toDateString() === filterDate.toDateString();
      });
    }

    filteredBookings.sort((a, b) => b.bookedAt.getTime() - a.bookedAt.getTime());

    res.json({
      success: true,
      bookings: filteredBookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const bookingIndex = bookings.findIndex(b => b.id === id);
    if (bookingIndex === -1) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const booking = bookings[bookingIndex];

    if (req.user?.id !== booking.userId && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (!['confirmed', 'waitlisted'].includes(booking.status)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel this booking' });
    }

    const wasConfirmed = booking.status === 'confirmed';

    bookings[bookingIndex] = {
      ...booking,
      status: 'cancelled',
      cancelledAt: new Date(),
      updatedAt: new Date()
    };

    const classIndex = classes.findIndex(c => c.id === booking.classId);
    if (classIndex !== -1) {
      if (wasConfirmed) {
        classes[classIndex].currentBookings--;
        
        const waitlistBooking = bookings.find(b => 
          b.classId === booking.classId && b.status === 'waitlisted'
        );
        if (waitlistBooking) {
          const waitlistIndex = bookings.findIndex(b => b.id === waitlistBooking.id);
          bookings[waitlistIndex].status = 'confirmed';
          bookings[waitlistIndex].position = undefined;
          classes[classIndex].waitlistCount--;
          classes[classIndex].currentBookings++;
        }
      } else {
        classes[classIndex].waitlistCount--;
      }
    }

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;

    const bookingIndex = bookings.findIndex(b => b.id === id);
    if (bookingIndex === -1) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    bookings[bookingIndex] = {
      ...bookings[bookingIndex],
      status,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      booking: bookings[bookingIndex]
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
