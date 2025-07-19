import express from 'express';
import { body, query } from 'express-validator';
import { getNotifications, createNotification, markAsRead, deleteNotification } from '../controllers/notificationController';
import { authenticate, authorize, requireSameGym } from '../middleware/auth';

const router = express.Router();

router.get('/', [
  authenticate,
  query('userId').optional(),
  query('isRead').optional().isBoolean(),
  query('type').optional().isIn(['class_reminder', 'class_cancelled', 'workout_assigned', 'announcement', 'booking_confirmed', 'waitlist_promoted'])
], getNotifications);

router.post('/', [
  authenticate,
  authorize('admin', 'coach'),
  body('userId').notEmpty(),
  body('gymId').notEmpty(),
  body('type').isIn(['class_reminder', 'class_cancelled', 'workout_assigned', 'announcement', 'booking_confirmed', 'waitlist_promoted']),
  body('title').notEmpty().trim(),
  body('message').notEmpty().trim(),
  body('data').optional().isObject()
], requireSameGym, createNotification);

router.put('/:id/read', authenticate, markAsRead);

router.delete('/:id', authenticate, deleteNotification);

export default router;
