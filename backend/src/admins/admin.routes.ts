import express from 'express';
import { authenticate } from '../auth/middleware/authenticate';
import { adminController } from './admin.controller';

const router = express.Router();

router.get('/', authenticate, adminController.getAdmins);

router.get('/:id', authenticate, adminController.getAdmin);

router.post('/', authenticate, adminController.createAdmin);

router.patch('/:id', authenticate, adminController.updateAdmin);

export default router;