"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
exports.AuthController = {
    login: async (req, res) => {
        const { email, password, rememberMe } = req.body;
        const result = await auth_service_1.authService.login({ email, password, rememberMe });
        if ('status' in result) {
            return res.status(result.status).json({ message: result.message });
        }
        return res.status(200).json({
            message: 'Login successful',
            token: result.token,
            user: result.user,
        });
    },
    checkPassword: async (req, res) => {
        const userId = parseInt(req.params.id);
        const { password } = req.body;
        const result = await auth_service_1.authService.checkPassword(userId, password);
        return res.status(200).json({
            message: 'Password check successful',
            isValid: result.isValid,
        });
    },
    logout: async (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = req.user.id;
        const result = await auth_service_1.authService.logout(userId);
        return res.status(200).json({
            message: 'Logout successful',
            success: result.success,
        });
    },
    getMe: async (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        return res.status(200).json(req.user);
    }
};
