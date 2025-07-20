
import { Request, Response, NextFunction } from 'express';
import { scanJobsService } from './scan-job.service';


export const scanJobsController = {
  createScanJob: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { templateId, pages } = req.body;

      const documentUrl = (req.file as any)?.path;

      if (!documentUrl) {
        return res.status(400).json({ message: 'Document file is required.' });
      }

      const job = await scanJobsService.createScanJob({
        documentUrl,
        templateId,
        pages: Number(pages),
      });

      res.status(201).json({ message: 'Scan job created', job });
    } catch (err) {
      next(err);
    }
  },

  getScanJobs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scanJobs = await scanJobsService.getAllScanJobs();
      res.status(200).json({ message: 'Scan jobs retrieved', scanJobs });
    } catch (err) {
      next(err);
    }
  },

  getJobStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId = Number(req.params.id);  
      const job = await scanJobsService.getJobStatus(+req.params.id);
      if (!job) {
        return res.status(404).json({ message: 'Scan job not found' });
      }
      res.status(200).json({ job });
    } catch (err) {
      next(err);
    }
  },
};
