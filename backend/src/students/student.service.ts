import { get } from "http";
import { Student } from "./student.entity";
import { User } from "../users/user.entity";
import { PasswordService } from "../auth/password.service";
import { UserType } from "../users/types";
import { ScanJob } from "../scan_job/scan-job.entity";

const passwordService = new PasswordService();

export const studentService = {create: async (data: any) => {
    const { email, password, name, surname, phoneNumber, parentEmail } = data;
  
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
      type: UserType.STUDENT,
    });
  

    const student = Student.create({
      user,
      parentEmail,
    });
  
    return await student.save();
  },

   getAll: async () => {
     return await Student.find({ relations: ['user'] });
   },
  getById: async (id: number) => {
    return await Student.findOne({
      where: { id },
      relations: ['user'],
    });
  },


  update: async (id: number, data: Partial<Student> & { email?: string; name?: string; surname?: string; phoneNumber?: string; password?: string,salt?: string;  }) => {
    const student = await Student.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!student) throw new Error('Student not found');
  
    if ('parentEmail' in data) {
      student.parentEmail = data.parentEmail!;
    }
  
    const userFields = ['email', 'name', 'surname', 'phoneNumber', 'password', 'salt'] as const;
    userFields.forEach((field) => {
      if (field in data && data[field] !== undefined) {
        (student.user as any)[field] = (data as any)[field];
      }
    });

    student.user.type = UserType.STUDENT;


    await student.user.save();
    await student.save();
  
    return student;
  },

  getScanJobsWithResultsByStudentId: async (studentId: string) => {
    
      const results = await ScanJob.createQueryBuilder('scanJob')
        .leftJoinAndSelect('scanJob.ocrResult', 'ocrResult')
        .leftJoinAndSelect('ocrResult.questions', 'questions')
        .where('ocrResult.studentId = :studentId', { studentId })
        .orderBy('scanJob.createdAt', 'DESC')
        .getMany();
    
    return results.map(result => ({
      id: result.id,
      status: result.status,
      createdAt: result.createdAt,
      templateName: (result as any).templateName,  
      score: result.ocrResult?.score ?? 0,
      questions: result.ocrResult?.questions ?? [],
    }));
  }
  
}