"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grade = void 0;
// src/grades/grade.entity.ts
const typeorm_1 = require("typeorm");
const ocr_entity_1 = require("../ocr/ocr.entity");
let Grade = class Grade extends typeorm_1.BaseEntity {
};
exports.Grade = Grade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Grade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ocr_entity_1.OCRResult),
    __metadata("design:type", ocr_entity_1.OCRResult)
], Grade.prototype, "ocrResult", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Grade.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Grade.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Array)
], Grade.prototype, "detailedScores", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Grade.prototype, "gradedAt", void 0);
exports.Grade = Grade = __decorate([
    (0, typeorm_1.Entity)('grades')
], Grade);
