"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recognizeTextWithVision = recognizeTextWithVision;
const vision_1 = __importDefault(require("@google-cloud/vision"));
const client = new vision_1.default.ImageAnnotatorClient({
    keyFilename: './stoked-outlook-373204-c3718d95d3ee.json',
});
async function recognizeTextWithVision(imageBuffer) {
    const [result] = await client.textDetection({ image: { content: imageBuffer } });
    const detections = result.textAnnotations;
    return result.textAnnotations?.[0]?.description?.trim() ?? '';
}
