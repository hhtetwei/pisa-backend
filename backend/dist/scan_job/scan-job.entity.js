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
exports.ScanJob = void 0;
const typeorm_1 = require("typeorm");
const ocr_entity_1 = require("../ocr/ocr.entity");
const template_entity_1 = require("../templates/template.entity");
let ScanJob = class ScanJob extends typeorm_1.BaseEntity {
};
exports.ScanJob = ScanJob;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ScanJob.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ScanJob.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ScanJob.prototype, "documentUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => template_entity_1.Template),
    (0, typeorm_1.JoinColumn)({ name: 'templateId' }),
    __metadata("design:type", template_entity_1.Template)
], ScanJob.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ScanJob.prototype, "templateId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ScanJob.prototype, "pages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ScanJob.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ocr_entity_1.OCRResult, result => result.scanJob),
    __metadata("design:type", ocr_entity_1.OCRResult)
], ScanJob.prototype, "ocrResult", void 0);
exports.ScanJob = ScanJob = __decorate([
    (0, typeorm_1.Entity)('scan_jobs')
], ScanJob);
