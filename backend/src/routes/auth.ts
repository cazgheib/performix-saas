import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe, refreshToken } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('role').isIn(['admin', 'coach', 'athlete']),
  body('gymId').notEmpty()
], register);

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], login);

router.get('/me', authenticate, getMe);

router.post('/refresh', authenticate, refreshToken);

export default router;
