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
exports.TemplateRegion = void 0;
const typeorm_1 = require("typeorm");
const template_entity_1 = require("../templates/template.entity");
let TemplateRegion = class TemplateRegion extends typeorm_1.BaseEntity {
};
exports.TemplateRegion = TemplateRegion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TemplateRegion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TemplateRegion.prototype, "regionId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TemplateRegion.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], TemplateRegion.prototype, "coordinates", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], TemplateRegion.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TemplateRegion.prototype, "correctAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TemplateRegion.prototype, "optionLabel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => template_entity_1.Template, template => template.regions),
    __metadata("design:type", template_entity_1.Template)
], TemplateRegion.prototype, "template", void 0);
exports.TemplateRegion = TemplateRegion = __decorate([
    (0, typeorm_1.Entity)('template_regions')
], TemplateRegion);
