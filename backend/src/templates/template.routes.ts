import { Router } from 'express';
import { templatesController } from './template.controller';


const router = Router();

router.post('/', templatesController.createTemplate);
router.get('/', templatesController.listTemplates);
router.get('/:id', templatesController.getTemplateById);

export default router;