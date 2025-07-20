import vision from '@google-cloud/vision';
import { preprocessImageFromUrl } from '../ocr/utils/process-image';

const client = new vision.ImageAnnotatorClient({
  keyFilename: './stoked-outlook-373204-c3718d95d3ee.json',
});

export const visionService = {
  extractTextFromRegion: async (documentUrl: string, coordinates: number[]) => {
    const croppedImageBuffer = await preprocessImageFromUrl(documentUrl, coordinates);
    const [result] = await client.textDetection({ image: { content: croppedImageBuffer } });

    const detections = result.textAnnotations;
    if (!detections || detections.length === 0) return '';

    return detections[0].description?.trim() || '';
  },
};
