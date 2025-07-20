"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ocr_entity_1 = require("../../ocr/ocr.entity");
const ocr_service_1 = require("../../ocr/ocr.service");
const scan_job_entity_1 = require("../../scan_job/scan-job.entity");
const scan_job_service_1 = require("../../scan_job/scan-job.service");
const template_service_1 = require("../../templates/template.service");
jest.mock('../../templates/template.service');
jest.mock('../../ocr/ocr.service');
jest.mock('../../ocr/ocr.entity');
const mockUpdateResult = {
    generatedMaps: [],
    raw: [],
    affected: 1,
};
jest.mock('../../scan_job/scan-job.entity', () => {
    const actual = jest.requireActual('../../scan_job/scan-job.entity');
    return {
        ...actual,
        ScanJob: {
            ...actual.ScanJob,
            update: jest.fn().mockResolvedValue({
                generatedMaps: [],
                raw: [],
                affected: 1,
            }),
            create: jest.fn(),
            findOne: jest.fn(),
        },
    };
});
describe('scanJobsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('processScanJob should update status and process OCR', async () => {
        scan_job_entity_1.ScanJob.findOne.mockResolvedValue({
            id: 'job1',
            templateId: 'template1',
        });
        template_service_1.templatesService.getTemplateById.mockResolvedValue({
            regions: [{ coordinates: ['1', '2', '3', '4'] }],
        });
        ocr_service_1.ocrService.processDocument.mockResolvedValue({ id: 'ocr1' });
        ocr_entity_1.OCRResult.findOne.mockResolvedValue({
            id: 'ocr1',
            studentId: 'student1',
            score: 90,
            questions: [],
        });
        await expect(scan_job_service_1.scanJobsService.processScanJob('job1')).resolves.toBeDefined();
        expect(scan_job_entity_1.ScanJob.update).toHaveBeenCalledWith('job1', expect.objectContaining({ status: 'processing' }));
        expect(scan_job_entity_1.ScanJob.update).toHaveBeenCalledWith('job1', expect.objectContaining({ status: 'completed' }));
    });
});
