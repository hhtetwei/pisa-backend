import { userService } from "./user.service";
import { Request, Response } from 'express';

export const userController = {
    createUser: async (req: Request, res: Response) => {
       const user = await userService.createUser(req.body);
       return res.status(201).json({
           message: 'User created successfully',
           user: user
       });
    },

    getUsers: async (req: Request, res: Response) => {
        const users = await userService.getUsers();
        return res.status(200).json(users);
    },

    getUserById: async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id);
        const user = await userService.getUserById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    }

    
}


