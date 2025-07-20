import express from 'express';
import { authenticate } from '../auth/middleware/authenticate';
import { studentController } from './student.controller';


const router = express.Router();



router.get('/', authenticate, studentController.getStudents);

router.get('/:id/scan-jobs', authenticate, studentController.getStudentScanJobs); 

router.get('/:id', authenticate, studentController.getStudent);

router.post('/', authenticate, studentController.createStudent);

router.patch('/:id', authenticate, studentController.updateStudent);

export default router;