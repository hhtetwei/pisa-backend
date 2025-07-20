"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templatesController = void 0;
const template_service_1 = require("./template.service");
exports.templatesController = {
    createTemplate: async (req, res, next) => {
        try {
            console.log('req.body:', req.body);
            const result = await template_service_1.templatesService.createTemplate(req.body);
            res.status(201).json({ message: 'Template created', result });
        }
        catch (error) {
            next(error);
        }
    },
    getTemplateById: async (req, res, next) => {
        try {
            const result = await template_service_1.templatesService.getTemplateById(+req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Template not found' });
            }
            res.status(200).json({ message: 'Template retrieved', result });
        }
        catch (error) {
            next(error);
        }
    },
    listTemplates: async (_req, res, next) => {
        try {
            const result = await template_service_1.templatesService.listTemplates();
            res.status(200).json({ message: 'Templates retrieved', result });
        }
        catch (error) {
            next(error);
        }
    },
};
