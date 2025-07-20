import { Request, Response } from 'express';


import { authService } from './auth.service';

export const AuthController = {
  login: async (req: Request, res: Response) => {
    const { email, password, rememberMe } = req.body;
  
    const result = await authService.login({ email, password, rememberMe });
  
    if ('status' in result) {
      return res.status(result.status!).json({ message: result.message });
    }
  
    return res.status(200).json({
      message: 'Login successful',
      token: result.token,
      user: result.user,
    });
  },
  

  checkPassword: async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const { password } = req.body;

    const result = await authService.checkPassword(userId, password);
    
    return res.status(200).json({
      message: 'Password check successful',
      isValid: result.isValid,
    });
  },


  logout: async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const userId = req.user.id;
  
    const result = await authService.logout(userId);
  
    return res.status(200).json({
      message: 'Logout successful',
      success: result.success,
    });
  },

  getMe: async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    return res.status(200).json(req.user);
  }
  
  
};