import express from 'express';
import { body } from 'express-validator';
import { getUsers, inviteUser, updateUser, deleteUser, getUserProfile } from '../controllers/userController';
import { authenticate, authorize, requireSameGym } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, authorize('admin'), getUsers);

router.post('/invite', [
  authenticate,
  authorize('admin'),
  body('email').isEmail().normalizeEmail(),
  body('role').isIn(['coach', 'athlete']),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim()
], inviteUser);

router.get('/:id', authenticate, requireSameGym, getUserProfile);

router.put('/:id', [
  authenticate,
  requireSameGym,
  body('firstName').optional().trim(),
  body('lastName').optional().trim(),
  body('bio').optional().trim(),
  body('profileImage').optional().isURL()
], updateUser);

router.delete('/:id', authenticate, authorize('admin'), requireSameGym, deleteUser);

export default router;
