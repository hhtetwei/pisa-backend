"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../auth/middleware/authenticate");
const teacher_controller_1 = require("./teacher.controller");
const validate_1 = require("../auth/middleware/validate");
const teacher_schema_1 = require("./teacher.schema");
const router = express_1.default.Router();
router.get('/', authenticate_1.authenticate, teacher_controller_1.teacherController.getTeachers);
router.get('/:id', authenticate_1.authenticate, teacher_controller_1.teacherController.getTeacher);
router.post('/', authenticate_1.authenticate, (0, validate_1.validate)(teacher_schema_1.createTeacherSchema), teacher_controller_1.teacherController.createTeacher);
router.patch('/:id', authenticate_1.authenticate, teacher_controller_1.teacherController.updateTeacher);
exports.default = router;
