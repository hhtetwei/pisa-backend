"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanJobsService = void 0;
const ocr_service_1 = require("../ocr/ocr.service");
const template_service_1 = require("../templates/template.service");
const ocr_entity_1 = require("../ocr/ocr.entity");
const scan_job_entity_1 = require("./scan-job.entity");
exports.scanJobsService = {
    createScanJob: async (data) => {
        console.log('[ScanJobsService] Creating scan job with data:', data);
        const scanJob = scan_job_entity_1.ScanJob.create({
            ...data,
            status: 'pending',
        });
        await scanJob.save();
        console.log(`[ScanJobsService] Scan job created with ID: ${scanJob.id}`);
        exports.scanJobsService.processScanJob(scanJob.id).catch(err => {
            console.error(`[ScanJobsService] Failed to process scan job ${scanJob.id}:`, err);
        });
        return scanJob;
    },
    processScanJob: async (jobId) => {
        const scanJob = await scan_job_entity_1.ScanJob.findOne({ where: { id: jobId } });
        if (!scanJob)
            throw new Error(`Scan job ${jobId} not found`);
        try {
            console.log(`[ScanJobsService] Starting processing for job ID: ${jobId}`);
            await scan_job_entity_1.ScanJob.update(jobId, { status: 'processing' });
            const templateId = Number(scanJob.templateId);
            const template = await template_service_1.templatesService.getTemplateById(templateId);
            if (!template)
                throw new Error(`Template ${scanJob.templateId} not found`);
            template.regions.forEach((region) => {
                region.coordinates = region.coordinates.map((c) => Number(c));
            });
            console.log(`[ScanJobsService] Normalized region coordinates:`, template.regions.map(r => r.coordinates));
            const ocrResult = await ocr_service_1.ocrService.processDocument(scanJob.documentUrl, template, scanJob.id.toString());
            const ocrResultWithQuestions = await ocr_entity_1.OCRResult.findOne({
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
            await scan_job_entity_1.ScanJob.update(jobId, { status: 'completed' });
            return { scanJob, ocrResult: ocrResultWithQuestions };
        }
        catch (err) {
            await scan_job_entity_1.ScanJob.update(jobId, { status: 'failed' });
            console.error(`[ScanJobsService] Processing failed for job ${jobId}`, err);
            throw err;
        }
    },
    getAllScanJobs: async () => {
        const scanJobs = await scan_job_entity_1.ScanJob.find({
            relations: ['template'],
        });
        return scanJobs;
    },
    getJobStatus: async (jobId) => {
        console.log(`[ScanJobsService] Getting status for job ID: ${jobId}`);
        const job = await scan_job_entity_1.ScanJob.findOne({ where: { id: jobId } });
        console.log(`[ScanJobsService] Job status:`, job?.status);
        return job;
    },
};
