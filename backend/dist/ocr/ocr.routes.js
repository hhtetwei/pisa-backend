"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../auth/middleware/authenticate");
const ocr_controller_1 = require("./ocr.controller");
const router = express_1.default.Router();
router.post('/process-document', authenticate_1.authenticate, ocr_controller_1.ocrController.getOCResults);
router.get('/', authenticate_1.authenticate, ocr_controller_1.ocrController.getOCResults);
router.get('/:id', authenticate_1.authenticate, ocr_controller_1.ocrController.getOCResultById);
exports.default = router;
