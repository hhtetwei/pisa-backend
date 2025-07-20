"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const password_service_1 = require("../auth/password.service");
const ormconfig_1 = require("../ormconfig");
const user_entity_1 = require("./user.entity");
const passwordService = new password_service_1.PasswordService();
exports.userService = {
    createUser: async (userData) => {
        if (!userData.password) {
            throw new Error('Password is required');
        }
        const { salt, hashed } = await passwordService.hashPassword(userData.password);
        const userRepo = ormconfig_1.AppDataSource.getRepository(user_entity_1.User);
        const newUser = userRepo.create({
            ...userData,
            password: hashed,
            salt,
        });
        return await newUser.save();
    },
    getUsers: async () => {
        return await user_entity_1.User.find();
    },
    getUserById: async (id) => {
        return await user_entity_1.User.findOne({ where: { id } });
    },
};
