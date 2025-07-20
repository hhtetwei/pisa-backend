"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
exports.userController = {
    createUser: async (req, res) => {
        const user = await user_service_1.userService.createUser(req.body);
        return res.status(201).json({
            message: 'User created successfully',
            user: user
        });
    },
    getUsers: async (req, res) => {
        const users = await user_service_1.userService.getUsers();
        return res.status(200).json(users);
    },
    getUserById: async (req, res) => {
        const userId = parseInt(req.params.id);
        const user = await user_service_1.userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
};
