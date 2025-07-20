import { User } from '../users/user.entity';
import { PasswordService } from './password.service';
import { generateToken } from './utils/auth.utils';

const passwordService = new PasswordService();

export const authService = {
  login: async ({
    email,
    password,
    rememberMe,
  }: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { status: 401, message: 'User not found' };
    }

    const isValid = await passwordService.verify(password, user.password);

  
    if (!isValid) {
      return { status: 401, message: 'Invalid password' };
    }

    const token = generateToken(user.id, rememberMe);
    return { token, user };
  },

  checkPassword: async (userId: number, password: string) => {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return { status: 404, message: 'User not found' };
    }

    const isValid = await passwordService.verify(password, user.password);
    if (!isValid) {
      return { status: 401, message: 'Invalid password' };
    }

    return { isValid: true };
  },

  logout: async (userId: number) => {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return { status: 404, message: 'User not found' };
    }

    user.hasLoggedIn = false;
    await user.save();
    return { success: true };
  },
};


