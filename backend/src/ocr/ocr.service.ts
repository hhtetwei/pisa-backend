
import { createWorker } from 'tesseract.js';
import path from 'path';
import fs from 'fs';

import {
  drawBoundingBoxesOnImage,
  isRegionMarked,
  preprocessImageFromUrl,
} from './utils/process-image';

import { OCRResult } from './ocr.entity';
import { templatesService } from '../templates/template.service';
import { extractedAnswersService } from '../extracted_answers/extracted-answers.service';

export const ocrService = {
  processDocument: async (documentUrl: string, template: any, jobId: string) => {
    const worker = await createWorker();

    try {

      await drawBoundingBoxesOnImage(
        documentUrl,
        template.regions.map((r: any) => ({
          coordinates: r.coordinates,
          label: r.regionId,
        }))
      );

      const qrRegion = templatesService.getQRRegion(template);
      let studentId = 'unknown';
      if (qrRegion) {
        const qrImage = await preprocessImageFromUrl(documentUrl, qrRegion.coordinates);
        const { data: qrData } = await worker.recognize(qrImage);
        studentId = qrData.text?.replace(/[^\w\d-]/g, '').trim() || 'unknown';
      }

      const ocrResult = OCRResult.create({ jobId, studentId });
      await ocrResult.save();

      const questionRegions = templatesService.getQuestionRegions(template);
      const ocrResultsByRegion = [];

      for (const region of questionRegions) {
        const regionImageBuffer = await preprocessImageFromUrl(documentUrl, region.coordinates);

        const debugPath = path.join(__dirname, `../../debug/q-${region.regionId}.png`);
        fs.mkdirSync(path.dirname(debugPath), { recursive: true });
        fs.writeFileSync(debugPath, regionImageBuffer);

        const { data } = await worker.recognize(regionImageBuffer);

        let isMarked = false;
        if (region.type === 'multiple_choice') {
          isMarked = await isRegionMarked(regionImageBuffer);
          console.log(`Region ${region.regionId} marked:`, isMarked);
        }

        let ocrText = data.text.trim();

        if (region.type === 'multiple_choice' && !ocrText && isMarked) {
          ocrText = region.optionLabel || 'Marked';
        }

        if (region.type === 'math' && ocrText === '-') {
          ocrText = '';
        }

        ocrResultsByRegion.push({
          region,
          ocrData: {
            ...data,
            text: ocrText,
            isMarked,
            confidence: data.confidence,
            score: data.confidence / 100,
          },
        });
      }

      const answers = await extractedAnswersService.createExtractedAnswers(
        ocrResultsByRegion,
        ocrResult
      );
      
      const totalScore = answers.reduce((sum, a) => sum + (a.score ?? 0), 0);
      const maxPossibleScore = answers.length * 100;
      const percentageScore =
        maxPossibleScore > 0
          ? Math.round((totalScore / maxPossibleScore) * 100)
          : 0;

      ocrResult.score = percentageScore;
      await ocrResult.save();

      return ocrResult;
    } finally {
      await worker.terminate();
    }
  },

  detectMarkedOption: (text: string, options: string[] = []) => {
    const cleanedText = text.replace(/\s+/g, '').toUpperCase();
    for (const option of options) {
      if (cleanedText.includes(option.toUpperCase())) {
        return option.toUpperCase();
      }
    }
    return null;
  },

  getAll: async () => {
    return await OCRResult.find({ relations: ['questions'] });
  },

  getById: async (id: number) => {
    return await OCRResult.findOne({
      where: { id },
      relations: ['questions'],
    });
  },
};
