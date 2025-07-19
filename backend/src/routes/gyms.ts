import express from 'express';
import { createGym, getGym, updateGym, getGymStats } from '../controllers/gymController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

router.post('/', createGym);
router.get('/', authenticateToken, getGym);
router.get('/:id', authenticateToken, getGym);
router.put('/:id', authenticateToken, requireRole(['admin']), updateGym);
router.get('/:id/stats', authenticateToken, requireRole(['admin']), getGymStats);

export default router;
