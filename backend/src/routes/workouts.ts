import express from 'express';
import { body, query } from 'express-validator';
import { getWorkouts, createWorkout, updateWorkout, deleteWorkout, getWorkoutDetails } from '../controllers/workoutController';
import { authenticate, authorize, requireSameGym } from '../middleware/auth';

const router = express.Router();

router.get('/', [
  authenticate,
  query('gymId').optional(),
  query('type').optional().isIn(['strength', 'cardio', 'crossfit', 'yoga', 'pilates', 'other']),
  query('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']),
  query('isTemplate').optional().isBoolean(),
  query('isPublic').optional().isBoolean()
], getWorkouts);

router.post('/', [
  authenticate,
  authorize('admin', 'coach'),
  body('gymId').notEmpty(),
  body('name').notEmpty().trim(),
  body('type').isIn(['strength', 'cardio', 'crossfit', 'yoga', 'pilates', 'other']),
  body('duration').isInt({ min: 1 }),
  body('difficulty').isIn(['beginner', 'intermediate', 'advanced']),
  body('instructions').notEmpty().trim(),
  body('movements').isArray({ min: 1 }),
  body('scoringType').isIn(['time', 'reps', 'weight', 'rounds', 'distance', 'none']),
  body('isTemplate').isBoolean(),
  body('description').optional().trim(),
  body('videoUrl').optional().isURL(),
  body('imageUrl').optional().isURL(),
  body('isPublic').optional().isBoolean(),
  body('price').optional().isFloat({ min: 0 })
], requireSameGym, createWorkout);

router.get('/:id', authenticate, getWorkoutDetails);

router.put('/:id', [
  authenticate,
  authorize('admin', 'coach'),
  body('name').optional().trim(),
  body('type').optional().isIn(['strength', 'cardio', 'crossfit', 'yoga', 'pilates', 'other']),
  body('duration').optional().isInt({ min: 1 }),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']),
  body('instructions').optional().trim(),
  body('movements').optional().isArray(),
  body('scoringType').optional().isIn(['time', 'reps', 'weight', 'rounds', 'distance', 'none']),
  body('isTemplate').optional().isBoolean(),
  body('description').optional().trim(),
  body('videoUrl').optional().isURL(),
  body('imageUrl').optional().isURL(),
  body('isPublic').optional().isBoolean(),
  body('price').optional().isFloat({ min: 0 })
], updateWorkout);

router.delete('/:id', authenticate, authorize('admin', 'coach'), deleteWorkout);

export default router;
