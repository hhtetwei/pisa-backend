"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeacherSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createTeacherSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    name: joi_1.default.string().required(),
    surname: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().required(),
});
