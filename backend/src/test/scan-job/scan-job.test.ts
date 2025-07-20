import { OCRResult } from "../../ocr/ocr.entity";
import { ocrService } from "../../ocr/ocr.service";
import { ScanJob } from "../../scan_job/scan-job.entity";
import { scanJobsService } from "../../scan_job/scan-job.service";
import { templatesService } from "../../templates/template.service";
import { UpdateResult } from "typeorm";

jest.mock('../../templates/template.service');
jest.mock('../../ocr/ocr.service');
jest.mock('../../ocr/ocr.entity');

const mockUpdateResult: UpdateResult = {
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
    (ScanJob.findOne as jest.Mock).mockResolvedValue({
      id: 'job1',
      templateId: 'template1',
    });
    (templatesService.getTemplateById as jest.Mock).mockResolvedValue({
      regions: [{ coordinates: ['1', '2', '3', '4'] }],
    });
    (ocrService.processDocument as jest.Mock).mockResolvedValue({ id: 'ocr1' });
    (OCRResult.findOne as jest.Mock).mockResolvedValue({
      id: 'ocr1',
      studentId: 'student1',
      score: 90,
      questions: [],
    });

    await expect(scanJobsService.processScanJob(1)).resolves.toBeDefined();

    expect(ScanJob.update).toHaveBeenCalledWith(
      'job1',
      expect.objectContaining({ status: 'processing' })
    );
    expect(ScanJob.update).toHaveBeenCalledWith(
      'job1',
      expect.objectContaining({ status: 'completed' })
    );
  });
});

