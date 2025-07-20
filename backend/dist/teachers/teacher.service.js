"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherService = void 0;
const password_service_1 = require("../auth/password.service");
const types_1 = require("../users/types");
const user_entity_1 = require("../users/user.entity");
const teacher_entity_1 = require("./teacher.entity");
const passwordService = new password_service_1.PasswordService();
exports.teacherService = {
    create: async (data) => {
        const { email, password, name, surname, phoneNumber } = data;
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
            type: types_1.UserType.TEACHER,
        });
        const teacher = teacher_entity_1.Teacher.create({ user });
        return await teacher.save();
    },
    getAll: async () => {
        const [teachers, count] = await teacher_entity_1.Teacher.findAndCount({ relations: ['user'] });
        return { teachers, count };
    },
    getById: async (id) => {
        return await teacher_entity_1.Teacher.findOne({
            where: { id },
            relations: ['user'],
        });
    },
    update: async (id, data) => {
        const teacher = await teacher_entity_1.Teacher.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!teacher)
            throw new Error('Teacher not found');
        Object.assign(teacher.user, data);
        await teacher.user.save();
        return teacher;
    },
};
