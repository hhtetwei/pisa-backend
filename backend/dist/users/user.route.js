"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const authenticate_1 = require("../auth/middleware/authenticate");
const validate_1 = require("../auth/middleware/validate");
const user_schema_1 = require("./user.schema");
const router = express_1.default.Router();
router.post('/', (0, validate_1.validate)(user_schema_1.createUserSchema), user_controller_1.userController.createUser);
router.get('/', authenticate_1.authenticate, user_controller_1.userController.getUsers);
router.get('/:id', authenticate_1.authenticate, user_controller_1.userController.getUserById);
exports.default = router;
