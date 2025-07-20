import { PasswordService } from '../auth/password.service';
import { AppDataSource } from '../ormconfig';
import { User } from './user.entity';
import { DeepPartial } from 'typeorm';

const passwordService = new PasswordService();

export const userService = {
  createUser: async (userData: Partial<User>) => {
    if (!userData.password) {
      throw new Error('Password is required');
    }

    const { salt, hashed } = await passwordService.hashPassword(userData.password);
    const userRepo = AppDataSource.getRepository(User);

    const newUser = userRepo.create({
      ...userData,
      password: hashed,
      salt,
    } as DeepPartial<User>); 

    return await newUser.save();
  },

  getUsers: async () => {
    return await User.find();
  },

  getUserById: async (id: number) => {
    return await User.findOne({ where: { id } });
  },
};

