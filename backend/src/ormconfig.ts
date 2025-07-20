import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./users/user.entity";
import { OCRResult } from "./ocr/ocr.entity";
import { Template } from "./templates/template.entity";
import { TemplateRegion } from "./template_regions/template-regions.entity";
import { ExtractedAnswer } from "./extracted_answers/extracted-answers.entity";
import { ScanJob } from "./scan_job/scan-job.entity";
import { Teacher } from "./teachers/teacher.entity";
import { Student } from "./students/student.entity";
import { Admin } from "./admins/admin.entity";


dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, OCRResult, Template, TemplateRegion, ExtractedAnswer,ScanJob, Teacher, Student, Admin],
  synchronize: true, 
  logging: false,
});