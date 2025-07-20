"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinaryConfig_1 = __importDefault(require("./cloudinaryConfig"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinaryConfig_1.default,
    params: {
        folder: 'photos',
        public_id: (req, file) => {
            const ext = file.originalname.split('.').pop();
            return `${file.fieldname}-${Date.now()}.${ext}`;
        },
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image'))
        cb(null, true);
    else
        cb(null, false);
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },
});
exports.uploadSingle = upload.single('image');
exports.uploadImages = upload.array('images', 10);
