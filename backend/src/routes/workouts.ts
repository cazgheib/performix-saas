import express from 'express';
import { createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout } from '../controllers/workoutController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, requireRole(['admin', 'coach']), createWorkout);
router.get('/', authenticateToken, getWorkouts);
router.get('/:id', authenticateToken, getWorkout);
router.put('/:id', authenticateToken, requireRole(['admin', 'coach']), updateWorkout);
router.delete('/:id', authenticateToken, requireRole(['admin', 'coach']), deleteWorkout);

export default router;
