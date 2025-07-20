"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
const process_image_1 = require("../../ocr/utils/process-image");
jest.mock('axios');
jest.mock('sharp');
describe('Image processing utilities', () => {
    const fakeImageBuffer = Buffer.from('fake-image-data');
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('preprocessImageFromUrl extracts correct region and processes image', async () => {
        axios_1.default.get.mockResolvedValue({ data: fakeImageBuffer });
        const mockExtract = jest.fn().mockReturnThis();
        const mockNormalize = jest.fn().mockReturnThis();
        const mockSharpen = jest.fn().mockReturnThis();
        const mockToBuffer = jest.fn().mockResolvedValue(Buffer.from('processed-buffer'));
        sharp_1.default.mockReturnValue({
            grayscale: jest.fn().mockReturnThis(),
            extract: mockExtract,
            normalize: mockNormalize,
            sharpen: mockSharpen,
            toBuffer: mockToBuffer,
        });
        const result = await (0, process_image_1.preprocessImageFromUrl)('http://answer-sheet/image.png', [10, 20, 110, 120]);
        expect(axios_1.default.get).toHaveBeenCalledWith('http://answer-sheet/image.png', { responseType: 'arraybuffer' });
        expect(mockExtract).toHaveBeenCalledWith({ left: 10, top: 20, width: 100, height: 100 });
        expect(result).toBeInstanceOf(Buffer);
    });
    it('isRegionMarked returns true if dark pixels ratio above threshold', async () => {
        const rawBuffer = Buffer.from([0, 0, 0, 255, 255, 255]);
        const mockRawToBuffer = jest.fn().mockResolvedValue({ data: [0, 0, 0, 255, 255, 255], info: { width: 3, height: 2 } });
        sharp_1.default.mockReturnValue({
            grayscale: jest.fn().mockReturnThis(),
            threshold: jest.fn().mockReturnThis(),
            raw: jest.fn().mockReturnThis(),
            toBuffer: mockRawToBuffer,
        });
        const result = await (0, process_image_1.isRegionMarked)(Buffer.from('anything'), 0.1);
        expect(result).toBe(true);
    });
});
