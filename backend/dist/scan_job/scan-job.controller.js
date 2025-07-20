"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanJobsController = void 0;
const scan_job_service_1 = require("./scan-job.service");
exports.scanJobsController = {
    createScanJob: async (req, res, next) => {
        try {
            const { templateId, pages } = req.body;
            const documentUrl = req.file?.path;
            if (!documentUrl) {
                return res.status(400).json({ message: 'Document file is required.' });
            }
            const job = await scan_job_service_1.scanJobsService.createScanJob({
                documentUrl,
                templateId,
                pages: Number(pages),
            });
            res.status(201).json({ message: 'Scan job created', job });
        }
        catch (err) {
            next(err);
        }
    },
    getScanJobs: async (req, res, next) => {
        try {
            const scanJobs = await scan_job_service_1.scanJobsService.getAllScanJobs();
            res.status(200).json({ message: 'Scan jobs retrieved', scanJobs });
        }
        catch (err) {
            next(err);
        }
    },
    getJobStatus: async (req, res, next) => {
        try {
            const jobId = Number(req.params.id);
            const job = await scan_job_service_1.scanJobsService.getJobStatus(+req.params.id);
            if (!job) {
                return res.status(404).json({ message: 'Scan job not found' });
            }
            res.status(200).json({ job });
        }
        catch (err) {
            next(err);
        }
    },
};
