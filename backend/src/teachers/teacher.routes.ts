import express from 'express';
import { authenticate } from '../auth/middleware/authenticate';
import { teacherController } from './teacher.controller';
import { validate } from '../auth/middleware/validate';
import { createTeacherSchema } from './teacher.schema';

const router = express.Router();

router.get('/', authenticate, teacherController.getTeachers);

router.get('/:id', authenticate, teacherController.getTeacher);

router.post('/', authenticate,validate(createTeacherSchema) ,teacherController.createTeacher);

router.patch('/:id', authenticate, teacherController.updateTeacher);

export default router;