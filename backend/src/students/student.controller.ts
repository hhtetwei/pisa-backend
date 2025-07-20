import { NextFunction, Request, Response } from 'express';
import { studentService } from './student.service';

export const studentController = {
  createStudent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const student = await studentService.create(req.body);
      res.status(201).json({ message: 'Student created', data: student });
    } catch (err) {
      next(err);
    }
    },
    
    getStudent: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = +req.params.id;
        if (isNaN(id)) {
          return res.status(400).json({ message: 'Invalid ID parameter' });
        }
        const student = await studentService.getById(id);
        res.status(200).json({ message: 'Student retrieved', data: student });
      } catch (err) {
        next(err);
      }
    },

    getStudents: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const students = await studentService.getAll();
        res.status(200).json({ message: 'Students retrieved', data: students });
      } catch (err) {
        next(err);
      }
    },

    updateStudent: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = +req.params.id;
        if (isNaN(id)) {
          return res.status(400).json({ message: 'Invalid ID parameter' });
        }
        const student = await studentService.update(id, req.body);
        res.status(200).json({ message: 'Student updated', data: student });
      } catch (err) {
        next(err);
      }
  },
    
  getStudentScanJobs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentId = req.params.id;
     
      const scanJobs = await studentService.getScanJobsWithResultsByStudentId(studentId);
      res.status(200).json({ message: 'Student scan jobs retrieved', data: scanJobs });
    } catch (err) {
      next(err);
    }
  }
    
  
};
