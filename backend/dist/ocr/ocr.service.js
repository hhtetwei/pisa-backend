"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ocrService = void 0;
const tesseract_js_1 = require("tesseract.js");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const process_image_1 = require("./utils/process-image");
const ocr_entity_1 = require("./ocr.entity");
const template_service_1 = require("../templates/template.service");
const extracted_answers_service_1 = require("../extracted_answers/extracted-answers.service");
exports.ocrService = {
    processDocument: async (documentUrl, template, jobId) => {
        const worker = await (0, tesseract_js_1.createWorker)();
        try {
            await (0, process_image_1.drawBoundingBoxesOnImage)(documentUrl, template.regions.map((r) => ({
                coordinates: r.coordinates,
                label: r.regionId,
            })));
            const qrRegion = template_service_1.templatesService.getQRRegion(template);
            let studentId = 'unknown';
            if (qrRegion) {
                const qrImage = await (0, process_image_1.preprocessImageFromUrl)(documentUrl, qrRegion.coordinates);
                const { data: qrData } = await worker.recognize(qrImage);
                studentId = qrData.text?.replace(/[^\w\d-]/g, '').trim() || 'unknown';
            }
            const ocrResult = ocr_entity_1.OCRResult.create({ jobId, studentId });
            await ocrResult.save();
            const questionRegions = template_service_1.templatesService.getQuestionRegions(template);
            const ocrResultsByRegion = [];
            for (const region of questionRegions) {
                const regionImageBuffer = await (0, process_image_1.preprocessImageFromUrl)(documentUrl, region.coordinates);
                const debugPath = path_1.default.join(__dirname, `../../debug/q-${region.regionId}.png`);
                fs_1.default.mkdirSync(path_1.default.dirname(debugPath), { recursive: true });
                fs_1.default.writeFileSync(debugPath, regionImageBuffer);
                const { data } = await worker.recognize(regionImageBuffer);
                let isMarked = false;
                if (region.type === 'multiple_choice') {
                    isMarked = await (0, process_image_1.isRegionMarked)(regionImageBuffer);
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
            const answers = await extracted_answers_service_1.extractedAnswersService.createExtractedAnswers(ocrResultsByRegion, ocrResult);
            const totalScore = answers.reduce((sum, a) => sum + (a.score ?? 0), 0);
            const maxPossibleScore = answers.length * 100;
            const percentageScore = maxPossibleScore > 0
                ? Math.round((totalScore / maxPossibleScore) * 100)
                : 0;
            ocrResult.score = percentageScore;
            await ocrResult.save();
            return ocrResult;
        }
        finally {
            await worker.terminate();
        }
    },
    detectMarkedOption: (text, options = []) => {
        const cleanedText = text.replace(/\s+/g, '').toUpperCase();
        for (const option of options) {
            if (cleanedText.includes(option.toUpperCase())) {
                return option.toUpperCase();
            }
        }
        return null;
    },
    getAll: async () => {
        return await ocr_entity_1.OCRResult.find({ relations: ['questions'] });
    },
    getById: async (id) => {
        return await ocr_entity_1.OCRResult.findOne({
            where: { id },
            relations: ['questions'],
        });
    },
};
