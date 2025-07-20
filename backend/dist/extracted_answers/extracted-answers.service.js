"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractedAnswersService = void 0;
const template_service_1 = require("../templates/template.service");
const extracted_answers_entity_1 = require("./extracted-answers.entity");
const string_similarity_1 = __importDefault(require("string-similarity"));
exports.extractedAnswersService = {
    createExtractedAnswers: async (ocrResultsByRegion, ocrResult) => {
        const answers = [];
        for (const { region, ocrData } of ocrResultsByRegion) {
            let detectedAnswer = null;
            let detectedText = null;
            let score = 0;
            const rawText = ocrData.text?.replace(/\n+/g, " ").replace(/\s+/g, " ").trim() || "";
            console.log("--- Processing Region ---");
            console.log("Region ID:", region.regionId);
            console.log("Region Type:", region.type);
            console.log("Raw OCR Text:", JSON.stringify(rawText));
            if (region.type === "multiple_choice") {
                console.log("Options:", region.options);
                console.log("Is Marked (checkbox detection):", ocrData.isMarked);
            }
            console.log("Expected Correct Answer:", region.correctAnswer);
            if (region.type === "multiple_choice") {
                detectedAnswer = template_service_1.templatesService.detectMarkedOption(rawText, region.options || []);
                console.log("Detected Answer from OCR:", detectedAnswer);
                if (!detectedAnswer && ocrData.isMarked) {
                    detectedAnswer = region.optionLabel || null;
                    console.log("Detected Answer from checkbox fallback (optionLabel):", detectedAnswer);
                }
                if (detectedAnswer && region.correctAnswer) {
                    score = detectedAnswer.toUpperCase() === region.correctAnswer.toUpperCase() ? 100 : 0;
                }
            }
            else {
                detectedText = rawText;
                console.log("Detected Text:", detectedText);
                if (detectedText && region.correctAnswer) {
                    const correctText = region.correctAnswer.trim().toLowerCase();
                    const givenText = detectedText.trim().toLowerCase();
                    if (correctText.includes(givenText) || givenText.includes(correctText)) {
                        score = 100;
                    }
                    else {
                        const similarity = string_similarity_1.default.compareTwoStrings(correctText, givenText);
                        if (similarity > 0.7) {
                            score = 70;
                        }
                    }
                }
            }
            console.log("Score:", score);
            console.log("-------------------------");
            const answer = new extracted_answers_entity_1.ExtractedAnswer();
            answer.questionId = region.regionId;
            answer.type = region.type;
            answer.detectedAnswer = detectedAnswer ?? "";
            answer.detectedText = detectedText ?? "";
            answer.score = score;
            answer.boundingBox = region.coordinates;
            answer.ocrResult = ocrResult;
            answers.push(answer);
        }
        await extracted_answers_entity_1.ExtractedAnswer.save(answers);
        return answers;
    },
};
