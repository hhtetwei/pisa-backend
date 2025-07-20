"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherController = void 0;
const teacher_service_1 = require("./teacher.service");
exports.teacherController = {
    createTeacher: async (req, res, next) => {
        try {
            const teacher = await teacher_service_1.teacherService.create(req.body);
            res.status(201).json({ message: 'Teacher created', data: teacher });
        }
        catch (err) {
            next(err);
        }
    },
    getTeachers: async (req, res, next) => {
        try {
            const { teachers, count } = await teacher_service_1.teacherService.getAll();
            res.status(200).json({ message: 'Teachers retrieved', data: teachers, count });
        }
        catch (err) {
            next(err);
        }
    },
    getTeacher: async (req, res, next) => {
        try {
            const id = +req.params.id;
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID parameter' });
            }
            const teacher = await teacher_service_1.teacherService.getById(id);
            res.status(200).json({ message: 'Teacher retrieved', teacher });
        }
        catch (err) {
            next(err);
        }
    },
    updateTeacher: async (req, res, next) => {
        try {
            const id = +req.params.id;
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID parameter' });
            }
            const teacher = await teacher_service_1.teacherService.update(id, req.body);
            res.status(200).json({ message: 'Teacher updated', teacher });
        }
        catch (err) {
            next(err);
        }
    },
};
