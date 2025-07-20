"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentService = void 0;
const student_entity_1 = require("./student.entity");
const user_entity_1 = require("../users/user.entity");
const password_service_1 = require("../auth/password.service");
const types_1 = require("../users/types");
const scan_job_entity_1 = require("../scan_job/scan-job.entity");
const passwordService = new password_service_1.PasswordService();
exports.studentService = { create: async (data) => {
        const { email, password, name, surname, phoneNumber, parentEmail } = data;
        const existingUser = await user_entity_1.User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
        const { salt, hashed } = await passwordService.hashPassword(password);
        const user = user_entity_1.User.create({
            email,
            password: hashed,
            salt,
            name,
            surname,
            phoneNumber,
            type: types_1.UserType.STUDENT,
        });
        const student = student_entity_1.Student.create({
            user,
            parentEmail,
        });
        return await student.save();
    },
    getAll: async () => {
        return await student_entity_1.Student.find({ relations: ['user'] });
    },
    getById: async (id) => {
        return await student_entity_1.Student.findOne({
            where: { id },
            relations: ['user'],
        });
    },
    update: async (id, data) => {
        const student = await student_entity_1.Student.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!student)
            throw new Error('Student not found');
        if ('parentEmail' in data) {
            student.parentEmail = data.parentEmail;
        }
        const userFields = ['email', 'name', 'surname', 'phoneNumber', 'password', 'salt'];
        userFields.forEach((field) => {
            if (field in data && data[field] !== undefined) {
                student.user[field] = data[field];
            }
        });
        student.user.type = types_1.UserType.STUDENT;
        await student.user.save();
        await student.save();
        return student;
    },
    getScanJobsWithResultsByStudentId: async (studentId) => {
        const results = await scan_job_entity_1.ScanJob.createQueryBuilder('scanJob')
            .leftJoinAndSelect('scanJob.ocrResult', 'ocrResult')
            .leftJoinAndSelect('ocrResult.questions', 'questions')
            .where('ocrResult.studentId = :studentId', { studentId })
            .orderBy('scanJob.createdAt', 'DESC')
            .getMany();
        return results.map(result => ({
            id: result.id,
            status: result.status,
            createdAt: result.createdAt,
            templateName: result.templateName,
            score: result.ocrResult?.score ?? 0,
            questions: result.ocrResult?.questions ?? [],
        }));
    }
};
