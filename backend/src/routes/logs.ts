import express from 'express';
import { body, query } from 'express-validator';
import { createWorkoutLog, getWorkoutLogs, updateWorkoutLog, deleteWorkoutLog, getLeaderboard } from '../controllers/logController';
import { authenticate, requireSameGym } from '../middleware/auth';

const router = express.Router();

router.post('/', [
  authenticate,
  body('workoutId').notEmpty(),
  body('gymId').notEmpty(),
  body('scoreType').isIn(['time', 'reps', 'weight', 'rounds', 'distance', 'none']),
  body('movements').isArray(),
  body('classId').optional(),
  body('duration').optional().isInt({ min: 1 }),
  body('score').optional().isFloat({ min: 0 }),
  body('notes').optional().trim()
], requireSameGym, createWorkoutLog);

router.get('/', [
  authenticate,
  query('userId').optional(),
  query('workoutId').optional(),
  query('gymId').notEmpty(),
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601()
], requireSameGym, getWorkoutLogs);

router.put('/:id', [
  authenticate,
  body('duration').optional().isInt({ min: 1 }),
  body('score').optional().isFloat({ min: 0 }),
  body('notes').optional().trim(),
  body('movements').optional().isArray()
], updateWorkoutLog);

router.delete('/:id', authenticate, deleteWorkoutLog);

router.get('/leaderboard', [
  authenticate,
  query('gymId').notEmpty(),
  query('workoutId').optional(),
  query('period').optional().isIn(['week', 'month', 'year', 'all']),
  query('limit').optional().isInt({ min: 1, max: 100 })
], requireSameGym, getLeaderboard);

export default router;
