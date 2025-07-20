"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const admin_entity_1 = require("./admin.entity");
const user_entity_1 = require("../users/user.entity");
const password_service_1 = require("../auth/password.service");
const types_1 = require("../users/types");
const passwordService = new password_service_1.PasswordService();
exports.adminService = {
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
            type: types_1.UserType.ADMIN,
        });
        const student = admin_entity_1.Admin.create({
            user,
        });
        return await student.save();
    },
    update: async (id, data) => {
        const admin = await admin_entity_1.Admin.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!admin)
            throw new Error('Teacher not found');
        Object.assign(admin.user, data);
        await admin.user.save();
        return admin;
    },
    getAll: async () => {
        return await admin_entity_1.Admin.find({ relations: ['user'] });
    },
    getById: async (id) => {
        return await admin_entity_1.Admin.findOne({
            where: { id },
            relations: ['user'],
        });
    },
};
