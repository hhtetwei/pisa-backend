import { NextFunction, Request, Response } from 'express';
import { ocrService } from './ocr.service';

export const ocrController = {
  
  getOCResults: async (req: Request, res: Response,next: NextFunction) => {
    try {
      const results = await ocrService.getAll();
      res.status(200).json({ message: 'OCR results retrieved', results });
    } catch (error) {
      next(error)
    }
  },

  getOCResultById: async (req: Request, res: Response,next: NextFunction) => {
    try {
      const id = +req.params.id;
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID parameter' });
      }
      const result = await ocrService.getById(id);
      res.status(200).json({ message: 'OCR result retrieved', result });
    } catch (error) {
     next(error)
    }
  },

};
