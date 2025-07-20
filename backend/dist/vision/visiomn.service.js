"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visionService = void 0;
const vision_1 = __importDefault(require("@google-cloud/vision"));
const process_image_1 = require("../ocr/utils/process-image");
const client = new vision_1.default.ImageAnnotatorClient({
    keyFilename: './stoked-outlook-373204-c3718d95d3ee.json',
});
exports.visionService = {
    extractTextFromRegion: async (documentUrl, coordinates) => {
        const croppedImageBuffer = await (0, process_image_1.preprocessImageFromUrl)(documentUrl, coordinates);
        const [result] = await client.textDetection({ image: { content: croppedImageBuffer } });
        const detections = result.textAnnotations;
        if (!detections || detections.length === 0)
            return '';
        return detections[0].description?.trim() || '';
    },
};
