"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const ormconfig_1 = require("./ormconfig");
const user_route_1 = __importDefault(require("./users/user.route"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const ocr_routes_1 = __importDefault(require("./ocr/ocr.routes"));
const template_routes_1 = __importDefault(require("./templates/template.routes"));
const teacher_routes_1 = __importDefault(require("./teachers/teacher.routes"));
const scan_job_routes_1 = __importDefault(require("./scan_job/scan-job.routes"));
const admin_routes_1 = __importDefault(require("./admins/admin.routes"));
const student_routes_1 = __importDefault(require("./students/student.routes"));
const errorHandler_1 = require("./errorHandler");
const cors_1 = __importDefault(require("cors"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
app.use('/users', user_route_1.default);
app.use('/auth', auth_routes_1.default);
app.use('/ocr', ocr_routes_1.default);
app.use('/teachers', teacher_routes_1.default);
app.use('/admins', admin_routes_1.default);
app.use('/students', student_routes_1.default);
app.use('/templates', template_routes_1.default);
app.use('/scan-jobs', scan_job_routes_1.default);
app.use(errorHandler_1.globalErrorHandler);
const PORT = process.env.PORT || 3000;
ormconfig_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error during Data Source initialization", error);
});
