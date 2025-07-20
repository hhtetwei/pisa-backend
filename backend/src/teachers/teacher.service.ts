
import { PasswordService } from "../auth/password.service";
import { UserType } from "../users/types";
import { User } from "../users/user.entity";
import { Teacher } from "./teacher.entity";

const passwordService = new PasswordService();

export const teacherService = {
    create: async (data: any) => {
        const { email, password, name, surname, phoneNumber } = data;
      
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          throw new Error("User with this email already exists");
        }
      
        const { salt, hashed } = await passwordService.hashPassword(password);
      
        const user = User.create({
          email,
          password: hashed,
          salt,
          name,
          surname,
          phoneNumber,
          type: UserType.TEACHER,
        });
      
        const teacher = Teacher.create({ user });
        return await teacher.save();
      },
      
        
       
      getAll: async () => {
        const [teachers, count] = await Teacher.findAndCount({ relations: ['user'] });
        return { teachers, count };
      },

  getById: async (id: number) => {
    return await Teacher.findOne({
      where: { id },
      relations: ['user'],
    });
  },

  update: async (id: number, data: Partial<Teacher>) => {
    const teacher = await Teacher.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!teacher) throw new Error('Teacher not found');
  
    Object.assign(teacher.user, data); 
    await teacher.user.save();
  
    return teacher;
  },
}