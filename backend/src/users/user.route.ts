import express from 'express';
import { userController } from './user.controller';
import { authenticate } from '../auth/middleware/authenticate';
import { validate } from '../auth/middleware/validate';
import { createUserSchema } from './user.schema';

const router = express.Router();

router.post('/', validate(createUserSchema),userController.createUser);
router.get('/', authenticate, userController.getUsers);
router.get('/:id', authenticate, userController.getUserById);

export default router;