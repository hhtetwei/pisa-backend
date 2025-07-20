import { get } from "http";
import { Admin } from "./admin.entity";
import { User } from "../users/user.entity";
import { PasswordService } from "../auth/password.service";
import { UserType } from "../users/types";

const passwordService = new PasswordService();

export const  adminService = {
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
          type: UserType.ADMIN,
        });
      
    
        const student = Admin.create({
          user,
        });
      
        return await student.save();
      },

    update: async(id: number, data: Partial<Admin>) => {
        const admin = await Admin.findOne({
           where: { id },
           relations: ['user'],
         });
         if (!admin) throw new Error('Teacher not found');
       
         Object.assign(admin.user, data); 
         await admin.user.save();
       
         return admin;
    },

     getAll: async () => {
        return await Admin.find({ relations: ['user'] });
      },
     getById: async (id: number) => {
       return await Admin.findOne({
         where: { id },
         relations: ['user'],
       });
     },
   
}