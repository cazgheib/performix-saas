import express from 'express';
import { body, query } from 'express-validator';
import { getClasses, createClass, updateClass, deleteClass, getClassDetails } from '../controllers/classController';
import { authenticate, authorize, requireSameGym } from '../middleware/auth';

const router = express.Router();

router.get('/', [
  authenticate,
  query('gymId').notEmpty(),
  query('date').optional().isISO8601(),
  query('coachId').optional()
], requireSameGym, getClasses);

router.post('/', [
  authenticate,
  authorize('admin', 'coach'),
  body('gymId').notEmpty(),
  body('name').notEmpty().trim(),
  body('coachId').notEmpty(),
  body('date').isISO8601(),
  body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('endTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('maxCapacity').isInt({ min: 1 }),
  body('description').optional().trim(),
  body('workoutId').optional()
], requireSameGym, createClass);

router.get('/:id', authenticate, getClassDetails);

router.put('/:id', [
  authenticate,
  authorize('admin', 'coach'),
  body('name').optional().trim(),
  body('coachId').optional(),
  body('date').optional().isISO8601(),
  body('startTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('endTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('maxCapacity').optional().isInt({ min: 1 }),
  body('description').optional().trim(),
  body('workoutId').optional()
], updateClass);

router.delete('/:id', authenticate, authorize('admin', 'coach'), deleteClass);

export default router;
