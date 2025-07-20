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
exports.OCRResult = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const scan_job_entity_1 = require("../scan_job/scan-job.entity");
const extracted_answers_entity_1 = require("../extracted_answers/extracted-answers.entity");
let OCRResult = class OCRResult extends typeorm_1.BaseEntity {
};
exports.OCRResult = OCRResult;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OCRResult.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OCRResult.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OCRResult.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => scan_job_entity_1.ScanJob, scanJob => scanJob.ocrResult),
    __metadata("design:type", scan_job_entity_1.ScanJob)
], OCRResult.prototype, "scanJob", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], OCRResult.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => extracted_answers_entity_1.ExtractedAnswer, answer => answer.ocrResult, { cascade: true }),
    __metadata("design:type", Array)
], OCRResult.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.ocrResults),
    __metadata("design:type", user_entity_1.User)
], OCRResult.prototype, "uploadedBy", void 0);
exports.OCRResult = OCRResult = __decorate([
    (0, typeorm_1.Entity)('ocr_results')
], OCRResult);
