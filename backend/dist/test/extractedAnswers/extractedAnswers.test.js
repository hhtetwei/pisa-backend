"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const extracted_answers_entity_1 = require("../../extracted_answers/extracted-answers.entity");
const extracted_answers_service_1 = require("../../extracted_answers/extracted-answers.service");
const extractedAnswersEntity = __importStar(require("../../extracted_answers/extracted-answers.entity"));
jest.spyOn(extractedAnswersEntity.ExtractedAnswer, 'save').mockImplementation(jest.fn());
describe('extractedAnswersService.createExtractedAnswers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should correctly create multiple choice extracted answers', async () => {
        const ocrResultsByRegion = [
            {
                region: {
                    regionId: 'q1',
                    type: 'multiple_choice',
                    options: ['A', 'B', 'C'],
                    correctAnswer: 'B',
                    optionLabel: 'B',
                    coordinates: [0, 0, 10, 10],
                },
                ocrData: {
                    text: ' B ',
                    isMarked: true,
                },
            },
        ];
        const ocrResultMock = { id: 'ocr1' };
        const answers = await extracted_answers_service_1.extractedAnswersService.createExtractedAnswers(ocrResultsByRegion, ocrResultMock);
        expect(answers).toHaveLength(1);
        expect(answers[0].detectedAnswer).toBe('B');
        expect(answers[0].score).toBe(100);
        expect(extracted_answers_entity_1.ExtractedAnswer.save).toHaveBeenCalled();
    });
    it('should handle text type region and score similarity', async () => {
        const ocrResultsByRegion = [
            {
                region: {
                    regionId: 'q2',
                    type: 'text',
                    correctAnswer: 'Hello World',
                    coordinates: [0, 0, 10, 10],
                },
                ocrData: {
                    text: 'hello worl',
                },
            },
        ];
        const ocrResultMock = { id: 'ocr2' };
        const answers = await extracted_answers_service_1.extractedAnswersService.createExtractedAnswers(ocrResultsByRegion, ocrResultMock);
        expect(answers).toHaveLength(1);
        expect(answers[0].detectedText.toLowerCase()).toBe('hello worl');
        expect(answers[0].score).toBeGreaterThanOrEqual(70);
        expect(extracted_answers_entity_1.ExtractedAnswer.save).toHaveBeenCalled();
    });
});
