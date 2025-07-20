"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const student_service_1 = require("./student.service");
exports.studentController = {
    createStudent: async (req, res, next) => {
        try {
            const student = await student_service_1.studentService.create(req.body);
            res.status(201).json({ message: 'Student created', data: student });
        }
        catch (err) {
            next(err);
        }
    },
    getStudent: async (req, res, next) => {
        try {
            const id = +req.params.id;
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID parameter' });
            }
            const student = await student_service_1.studentService.getById(id);
            res.status(200).json({ message: 'Student retrieved', data: student });
        }
        catch (err) {
            next(err);
        }
    },
    getStudents: async (req, res, next) => {
        try {
            const students = await student_service_1.studentService.getAll();
            res.status(200).json({ message: 'Students retrieved', data: students });
        }
        catch (err) {
            next(err);
        }
    },
    updateStudent: async (req, res, next) => {
        try {
            const id = +req.params.id;
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID parameter' });
            }
            const student = await student_service_1.studentService.update(id, req.body);
            res.status(200).json({ message: 'Student updated', data: student });
        }
        catch (err) {
            next(err);
        }
    },
    getStudentScanJobs: async (req, res, next) => {
        try {
            const studentId = req.params.id;
            const scanJobs = await student_service_1.studentService.getScanJobsWithResultsByStudentId(studentId);
            res.status(200).json({ message: 'Student scan jobs retrieved', data: scanJobs });
        }
        catch (err) {
            next(err);
        }
    }
};
