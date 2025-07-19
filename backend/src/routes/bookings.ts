import express from 'express';
import { createBooking, getUserBookings, cancelBooking } from '../controllers/bookingController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, createBooking);
router.get('/user', authenticateToken, getUserBookings);
router.delete('/:id', authenticateToken, cancelBooking);

export default router;
