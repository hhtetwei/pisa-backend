import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";

export const adminController = {
    createAdmin: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const admin = await adminService.create(req.body);
            res.status(201).json({ message: 'Admin created', data:admin });
        } catch (err) {
            next(err);
        }
    },

    getAdmins: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const admins = await adminService.getAll();
            res.status(200).json({ message: 'Admins retrieved', data:admins });
        } catch (err) {
            next(err);
        }
    },

    getAdmin: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const id = +req.params.id;
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID parameter' });
            }
            const admin = await adminService.getById(id);
            res.status(200).json({ message: 'Admin retrieved', data:admin });
        } catch (err) {
            next(err);
        }
    },

    updateAdmin: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const id = +req.params.id;
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid ID parameter' });
            }
            const admin = await adminService.update(id, req.body);
            res.status(200).json({ message: 'Admin updated', data: admin });
        } catch (err) {
            next(err);
        }
    }
}