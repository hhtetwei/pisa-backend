"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../auth/middleware/authenticate");
const student_controller_1 = require("./student.controller");
const router = express_1.default.Router();
router.get('/', authenticate_1.authenticate, student_controller_1.studentController.getStudents);
router.get('/:id/scan-jobs', authenticate_1.authenticate, student_controller_1.studentController.getStudentScanJobs);
router.get('/:id', authenticate_1.authenticate, student_controller_1.studentController.getStudent);
router.post('/', authenticate_1.authenticate, student_controller_1.studentController.createStudent);
router.patch('/:id', authenticate_1.authenticate, student_controller_1.studentController.updateStudent);
exports.default = router;
