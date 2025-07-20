"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const admin_service_1 = require("./admin.service");
exports.adminController = {
    createAdmin: async (req, res, next) => {
        try {
            const admin = await admin_service_1.adminService.create(req.body);
            res.status(201).json({ message: 'Admin created', data: admin });
        }
        catch (err) {
            next(err);
        }
    },
    getAdmins: async (req, res, next) => {
        try {
            const admins = await admin_service_1.adminService.getAll();
            res.status(200).json({ message: 'Admins retrieved', data: admins });
        }
        catch (err) {
            next(err);
        }
    },
    getAdmin: async (req, res, next) => {
        try {
            const id = +req.params.id;
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID parameter' });
            }
            const admin = await admin_service_1.adminService.getById(id);
            res.status(200).json({ message: 'Admin retrieved', data: admin });
        }
        catch (err) {
            next(err);
        }
    },
    updateAdmin: async (req, res, next) => {
        try {
            const id = +req.params.id;
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID parameter' });
            }
            const admin = await admin_service_1.adminService.update(id, req.body);
            res.status(200).json({ message: 'Admin updated', data: admin });
        }
        catch (err) {
            next(err);
        }
    }
};
