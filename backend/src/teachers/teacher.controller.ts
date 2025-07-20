import { NextFunction, Request, Response } from 'express';
import { teacherService } from './teacher.service';

export const teacherController = {
  createTeacher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teacher = await teacherService.create(req.body);
      res.status(201).json({ message: 'Teacher created', data: teacher });
    } catch (err) {
      next(err);
    }
  },

  getTeachers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { teachers, count } = await teacherService.getAll();
      res.status(200).json({ message: 'Teachers retrieved', data: teachers, count });
    } catch (err) {
      next(err);
    }
  },

  getTeacher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID parameter' });
      }
      const teacher = await teacherService.getById(id);
      res.status(200).json({ message: 'Teacher retrieved', teacher });
    } catch (err) {
      next(err);
    }
  },

  updateTeacher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID parameter' });
      }
      const teacher = await teacherService.update(id, req.body);
      res.status(200).json({ message: 'Teacher updated', teacher });
    } catch (err) {
      next(err);
    }
  },
};
