import express from 'express';
import { authenticate } from '../auth/middleware/authenticate';
import { ocrController } from './ocr.controller';
import { uploadSingle } from '../library/multer';


const router = express.Router();

router.post('/process-document', authenticate, ocrController.getOCResults);

router.get('/', authenticate, ocrController.getOCResults);

router.get('/:id', authenticate, ocrController.getOCResultById);

export default router;