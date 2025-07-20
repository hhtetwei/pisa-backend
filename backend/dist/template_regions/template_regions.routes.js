"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const template_controller_1 = require("../templates/template.controller");
const router = (0, express_1.Router)();
router.post('/', template_controller_1.templatesController.createTemplate);
router.get('/', template_controller_1.templatesController.listTemplates);
router.get('/:id', template_controller_1.templatesController.getTemplateById);
exports.default = router;
