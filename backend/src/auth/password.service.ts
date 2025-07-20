import * as bcrypt from 'bcryptjs';

export class PasswordService {
 async hashPassword(plainText: string): Promise<{ salt: string; hashed: string }> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed = await bcrypt.hash(plainText, salt);
    return { salt, hashed };
  }

 async verify(plainText: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedPassword);
  }
}