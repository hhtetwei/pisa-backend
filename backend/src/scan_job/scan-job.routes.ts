
import { Router } from 'express';
import { scanJobsController } from './scan-job.controller';
import { uploadSingle } from '../library/multer';

const router = Router();

router.get('/', scanJobsController.getScanJobs);
router.post('/', uploadSingle, scanJobsController.createScanJob);
router.get('/:id', scanJobsController.getJobStatus);

export default router;
