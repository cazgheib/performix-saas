import express from 'express';
import { body, query } from 'express-validator';
import { createBooking, getBookings, cancelBooking, updateBookingStatus } from '../controllers/bookingController';
import { authenticate, authorize, requireSameGym } from '../middleware/auth';

const router = express.Router();

router.post('/', [
  authenticate,
  body('classId').notEmpty(),
  body('gymId').notEmpty()
], requireSameGym, createBooking);

router.get('/', [
  authenticate,
  query('userId').optional(),
  query('gymId').notEmpty(),
  query('status').optional().isIn(['confirmed', 'waitlisted', 'cancelled', 'attended', 'no-show']),
  query('date').optional().isISO8601()
], requireSameGym, getBookings);

router.delete('/:id', authenticate, cancelBooking);

router.put('/:id/status', [
  authenticate,
  authorize('admin', 'coach'),
  body('status').isIn(['confirmed', 'waitlisted', 'cancelled', 'attended', 'no-show'])
], updateBookingStatus);

export default router;
