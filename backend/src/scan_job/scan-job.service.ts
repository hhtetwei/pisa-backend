
import { ocrService } from '../ocr/ocr.service';
import { templatesService } from '../templates/template.service';
import { OCRResult } from '../ocr/ocr.entity';
import { ScanJob } from './scan-job.entity';

export const scanJobsService = {
  createScanJob: async (data: {
    documentUrl: string;
    templateId: number;
    pages: number;
  }) => {
    console.log('[ScanJobsService] Creating scan job with data:', data);

    const scanJob = ScanJob.create({
      ...data,
      status: 'pending',
    });

    await scanJob.save();

    console.log(`[ScanJobsService] Scan job created with ID: ${scanJob.id}`);

    scanJobsService.processScanJob(scanJob.id).catch(err => {
      console.error(`[ScanJobsService] Failed to process scan job ${scanJob.id}:`, err);
    });

    return scanJob;
  },

  processScanJob: async (jobId: number) => {
    const scanJob = await ScanJob.findOne({ where: { id: jobId } });
    if (!scanJob) throw new Error(`Scan job ${jobId} not found`);
  
    try {
      console.log(`[ScanJobsService] Starting processing for job ID: ${jobId}`);
      await ScanJob.update(jobId, { status: 'processing' });

      const templateId = Number(scanJob.templateId);
  
      const template = await templatesService.getTemplateById(templateId);
      if (!template) throw new Error(`Template ${scanJob.templateId} not found`);
  
      template.regions.forEach((region: any) => {
        region.coordinates = region.coordinates.map((c: string | number) => Number(c));
      });
  
      console.log(`[ScanJobsService] Normalized region coordinates:`, template.regions.map(r => r.coordinates));
  
      const ocrResult = await ocrService.processDocument(
        scanJob.documentUrl,
        template,
        scanJob.id.toString()
      );
      
      const ocrResultWithQuestions = await OCRResult.findOne({
        where: { id: ocrResult.id },
        relations: ['questions'],
      });
  
      if (!ocrResultWithQuestions) {
        throw new Error(`OCRResult with id ${ocrResult.id} not found after processing`);
      }
  
      console.log(`[ScanJobsService] OCR processing completed for job ${jobId}`, {
        ocrResultId: ocrResultWithQuestions.id,
        studentId: ocrResultWithQuestions.studentId,
        score: ocrResultWithQuestions.score,
        questionsCount: ocrResultWithQuestions.questions.length,
      });
  
      await ScanJob.update(jobId, { status: 'completed' });
  
      return { scanJob, ocrResult: ocrResultWithQuestions };
    } catch (err) {
      await ScanJob.update(jobId, { status: 'failed' });
      console.error(`[ScanJobsService] Processing failed for job ${jobId}`, err);
      throw err;
    }
  },

  getAllScanJobs: async () => {
    const scanJobs = await ScanJob.find({
      relations: ['template'],
    });
    return scanJobs;
  },
  
  getJobStatus: async (jobId: number) => {
    console.log(`[ScanJobsService] Getting status for job ID: ${jobId}`);
    const job = await ScanJob.findOne({ where: { id: jobId } });
    console.log(`[ScanJobsService] Job status:`, job?.status);
    return job;
  },
};
