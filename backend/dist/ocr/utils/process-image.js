"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocessImageFromUrl = preprocessImageFromUrl;
exports.drawBoundingBoxesOnImage = drawBoundingBoxesOnImage;
exports.isRegionMarked = isRegionMarked;
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
async function preprocessImageFromUrl(imageUrl, coordinates) {
    const response = await axios_1.default.get(imageUrl, { responseType: 'arraybuffer' });
    let image = (0, sharp_1.default)(response.data).grayscale();
    if (coordinates && coordinates.length === 4) {
        const [x1, y1, x2, y2] = coordinates.map(Number);
        const width = x2 - x1;
        const height = y2 - y1;
        if (width <= 0 || height <= 0)
            throw new Error(`Invalid region: width=${width}, height=${height}`);
        image = image.extract({ left: x1, top: y1, width, height });
    }
    return image
        .normalize()
        .sharpen()
        .toBuffer();
}
async function drawBoundingBoxesOnImage(imageUrl, regions) {
    const response = await axios_1.default.get(imageUrl, { responseType: 'arraybuffer' });
    const image = (0, sharp_1.default)(response.data);
    const metadata = await image.metadata();
    if (!metadata.width || !metadata.height) {
        throw new Error('Cannot get image dimensions');
    }
    const svgRects = regions.map(({ coordinates, label }) => {
        const [x1, y1, x2, y2] = coordinates.map(Number);
        const width = x2 - x1;
        const height = y2 - y1;
        return `
      <rect x="${x1}" y="${y1}" width="${width}" height="${height}" fill="none" stroke="red" stroke-width="3"/>
      ${label ? `<text x="${x1 + 5}" y="${y1 + 20}" fill="red" font-size="20" font-family="Arial">${label}</text>` : ''}
    `;
    }).join('\n');
    const svgImage = `
    <svg width="${metadata.width}" height="${metadata.height}" xmlns="http://www.w3.org/2000/svg">
      ${svgRects}
    </svg>
  `;
    return image
        .composite([{ input: Buffer.from(svgImage), top: 0, left: 0 }])
        .png()
        .toBuffer();
}
async function isRegionMarked(imageBuffer, darknessThreshold = 0.06) {
    const image = (0, sharp_1.default)(imageBuffer).grayscale().threshold(150);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
    let darkPixels = 0;
    const totalPixels = info.width * info.height;
    for (let i = 0; i < data.length; i++) {
        if (data[i] < 128)
            darkPixels++;
    }
    const darkRatio = darkPixels / totalPixels;
    return darkRatio >= darknessThreshold;
}
