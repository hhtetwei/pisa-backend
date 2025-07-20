"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_entity_1 = require("../../users/user.entity");
async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            const user = await user_entity_1.User.findOne({ where: { id: decoded.userId } });
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        }
        catch (err) {
            console.error('[Auth] Invalid token:', err);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }
    catch (err) {
        next(err);
    }
}
