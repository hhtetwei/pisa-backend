
import { Request, Response, NextFunction } from 'express';
import { templatesService } from './template.service';


export const templatesController = {
  createTemplate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('req.body:', req.body);
      const result = await templatesService.createTemplate(req.body);
      res.status(201).json({ message: 'Template created', result });
    } catch (error) {
      next(error);
    }
  },

  getTemplateById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await templatesService.getTemplateById(+req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Template not found' });
      }
      res.status(200).json({ message: 'Template retrieved', result });
    } catch (error) {
      next(error);
    }
  },

  listTemplates: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await templatesService.listTemplates();
      res.status(200).json({ message: 'Templates retrieved', result });
    } catch (error) {
      next(error);
    }
  },
};
