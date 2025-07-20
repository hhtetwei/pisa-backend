"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const cloudinary_constants_1 = require("../constants/cloudinary-constants");
cloudinary_1.v2.config({
    cloud_name: cloudinary_constants_1.CLOUDINARY_CLOUD_NAME,
    api_key: cloudinary_constants_1.CLOUDINARY_API_KEY,
    api_secret: cloudinary_constants_1.CLOUDINARY_API_SECRET,
});
exports.default = cloudinary_1.v2;
