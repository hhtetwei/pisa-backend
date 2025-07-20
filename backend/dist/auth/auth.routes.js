"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_schema_1 = require("./auth.schema");
const auth_controller_1 = require("./auth.controller");
const authenticate_1 = require("./middleware/authenticate");
const validate_1 = require("./middleware/validate");
const router = express_1.default.Router();
router.get('/me', authenticate_1.authenticate, auth_controller_1.AuthController.getMe);
router.post('/login', (0, validate_1.validate)(auth_schema_1.loginSchema), auth_controller_1.AuthController.login);
router.post('/:id/check-password', authenticate_1.authenticate, (0, validate_1.validate)(auth_schema_1.checkPasswordSchema), auth_controller_1.AuthController.checkPassword);
router.post('/logout', authenticate_1.authenticate, auth_controller_1.AuthController.logout);
exports.default = router;
