"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ocrController = void 0;
const ocr_service_1 = require("./ocr.service");
exports.ocrController = {
    getOCResults: async (req, res, next) => {
        try {
            const results = await ocr_service_1.ocrService.getAll();
            res.status(200).json({ message: 'OCR results retrieved', results });
        }
        catch (error) {
            next(error);
        }
    },
    getOCResultById: async (req, res, next) => {
        try {
            const id = +req.params.id;
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID parameter' });
            }
            const result = await ocr_service_1.ocrService.getById(id);
            res.status(200).json({ message: 'OCR result retrieved', result });
        }
        catch (error) {
            next(error);
        }
    },
};
