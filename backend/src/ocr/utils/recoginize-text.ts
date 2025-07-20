import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient({
  keyFilename: './stoked-outlook-373204-c3718d95d3ee.json', 
});

export async function recognizeTextWithVision(imageBuffer: Buffer): Promise<string> {
  const [result] = await client.textDetection({ image: { content: imageBuffer } });
  const detections = result.textAnnotations;
  return result.textAnnotations?.[0]?.description?.trim() ?? '';
}
