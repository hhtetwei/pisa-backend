"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templatesService = void 0;
const template_entity_1 = require("./template.entity");
const template_regions_entity_1 = require("../template_regions/template-regions.entity");
exports.templatesService = {
    createTemplate: async (data) => {
        const { name, description, createdBy, regions } = data;
        const template = template_entity_1.Template.create({ name, description, createdBy });
        await template.save();
        if (regions && regions.length > 0) {
            const regionEntities = regions.map(region => {
                return template_regions_entity_1.TemplateRegion.create({
                    ...region,
                    template,
                });
            });
            await template_regions_entity_1.TemplateRegion.save(regionEntities);
        }
        return await template_entity_1.Template.findOne({
            where: { id: template.id },
            relations: ['regions'],
        });
    },
    getTemplateById: async (id) => {
        return await template_entity_1.Template.findOne({ where: { id }, relations: ['regions'] });
    },
    listTemplates: async () => {
        return await template_entity_1.Template.find({ relations: ['regions'] });
    },
    getQRRegion(template) {
        return template.regions.find((r) => r.type === 'qr_code');
    },
    getQuestionRegions(template) {
        return template.regions.filter((r) => r.type !== 'qr_code');
    },
    detectMarkedOption(text, options) {
        const normalizedText = text.trim().toUpperCase();
        for (const option of options) {
            if (normalizedText === option.toUpperCase()) {
                return option;
            }
        }
        return null;
    }
};
