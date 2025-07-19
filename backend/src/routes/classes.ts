import express from 'express';
import { createClass, getClasses, getClass, updateClass, deleteClass } from '../controllers/classController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, requireRole(['admin', 'coach']), createClass);
router.get('/', authenticateToken, getClasses);
router.get('/:id', authenticateToken, getClass);
router.put('/:id', authenticateToken, requireRole(['admin', 'coach']), updateClass);
router.delete('/:id', authenticateToken, requireRole(['admin', 'coach']), deleteClass);

export default router;
