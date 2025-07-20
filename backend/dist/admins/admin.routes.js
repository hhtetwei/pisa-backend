"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../auth/middleware/authenticate");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.get('/', authenticate_1.authenticate, admin_controller_1.adminController.getAdmins);
router.get('/:id', authenticate_1.authenticate, admin_controller_1.adminController.getAdmin);
router.post('/', authenticate_1.authenticate, admin_controller_1.adminController.createAdmin);
router.patch('/:id', authenticate_1.authenticate, admin_controller_1.adminController.updateAdmin);
exports.default = router;
