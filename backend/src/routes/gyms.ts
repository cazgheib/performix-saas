import express from 'express';
import { body } from 'express-validator';
import { createGym, getGym, updateGym, getGymStats } from '../controllers/gymController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.post('/', [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('phone').notEmpty(),
  body('address').notEmpty(),
  body('city').notEmpty(),
  body('state').notEmpty(),
  body('zipCode').notEmpty(),
  body('primaryColor').isHexColor(),
  body('secondaryColor').isHexColor(),
  body('subscriptionPlan').isIn(['basic', 'premium', 'enterprise']),
  body('adminEmail').isEmail().normalizeEmail(),
  body('adminPassword').isLength({ min: 6 }),
  body('adminFirstName').notEmpty().trim(),
  body('adminLastName').notEmpty().trim()
], createGym);

router.get('/:id', authenticate, getGym);

router.put('/:id', [
  authenticate,
  authorize('admin'),
  body('name').optional().trim(),
  body('email').optional().isEmail().normalizeEmail(),
  body('phone').optional(),
  body('address').optional(),
  body('city').optional(),
  body('state').optional(),
  body('zipCode').optional(),
  body('primaryColor').optional().isHexColor(),
  body('secondaryColor').optional().isHexColor(),
  body('subscriptionPlan').optional().isIn(['basic', 'premium', 'enterprise'])
], updateGym);

router.get('/:id/stats', authenticate, authorize('admin', 'coach'), getGymStats);

export default router;
