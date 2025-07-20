"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const user_entity_1 = require("../users/user.entity");
const password_service_1 = require("./password.service");
const auth_utils_1 = require("./utils/auth.utils");
const passwordService = new password_service_1.PasswordService();
exports.authService = {
    login: async ({ email, password, rememberMe, }) => {
        const user = await user_entity_1.User.findOne({ where: { email } });
        if (!user) {
            return { status: 401, message: 'User not found' };
        }
        const isValid = await passwordService.verify(password, user.password);
        if (!isValid) {
            return { status: 401, message: 'Invalid password' };
        }
        const token = (0, auth_utils_1.generateToken)(user.id, rememberMe);
        return { token, user };
    },
    checkPassword: async (userId, password) => {
        const user = await user_entity_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return { status: 404, message: 'User not found' };
        }
        const isValid = await passwordService.verify(password, user.password);
        if (!isValid) {
            return { status: 401, message: 'Invalid password' };
        }
        return { isValid: true };
    },
    logout: async (userId) => {
        const user = await user_entity_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return { status: 404, message: 'User not found' };
        }
        user.hasLoggedIn = false;
        await user.save();
        return { success: true };
    },
};
