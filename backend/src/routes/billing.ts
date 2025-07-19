import express from 'express';
import { body } from 'express-validator';
import { createCheckoutSession, getBillingStatus, handleWebhook, cancelSubscription } from '../controllers/billingController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.post('/create-session', [
  authenticate,
  authorize('admin'),
  body('priceId').notEmpty(),
  body('gymId').notEmpty()
], createCheckoutSession);

router.get('/status', authenticate, authorize('admin'), getBillingStatus);

router.post('/cancel', authenticate, authorize('admin'), cancelSubscription);

router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;
