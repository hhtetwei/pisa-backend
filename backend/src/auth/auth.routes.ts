import express from 'express';
import { loginSchema, checkPasswordSchema } from './auth.schema';
import { AuthController } from './auth.controller';
import { authenticate } from './middleware/authenticate';
import { validate } from './middleware/validate';


const router = express.Router();

router.get('/me', authenticate, AuthController.getMe);
router.post('/login', validate(loginSchema), AuthController.login);
router.post(
  '/:id/check-password',
  authenticate,
  validate(checkPasswordSchema),
  AuthController.checkPassword
);
router.post('/logout', authenticate, AuthController.logout);

export default router;