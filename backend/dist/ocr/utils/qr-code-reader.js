"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeQRFromBuffer = decodeQRFromBuffer;
const jsqr_1 = __importDefault(require("jsqr"));
const sharp_1 = __importDefault(require("sharp"));
async function getGrayscaleRawData(buffer) {
    const { data, info } = await (0, sharp_1.default)(buffer)
        .grayscale()
        .raw()
        .toBuffer({ resolveWithObject: true });
    return {
        data: new Uint8ClampedArray(data.buffer),
        width: info.width,
        height: info.height,
    };
}
async function decodeQRFromBuffer(imageBuffer) {
    const { data, width, height } = await getGrayscaleRawData(imageBuffer);
    const qrCode = (0, jsqr_1.default)(data, width, height);
    if (qrCode) {
        return qrCode.data;
    }
    return null;
}
