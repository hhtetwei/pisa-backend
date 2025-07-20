import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./ormconfig";
import userRoutes from './users/user.route';
import authRoutes from './auth/auth.routes';
import ocrRoutes from './ocr/ocr.routes';
import templateRoutes from './templates/template.routes';
import teachersRoute from './teachers/teacher.routes';
import scanJobsRoute from './scan_job/scan-job.routes'
import adminRoute from './admins/admin.routes'
import studentRoute from './students/student.routes'
import { globalErrorHandler } from "./errorHandler";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://pisa-frontend-xvuu.vercel.app/'],
  credentials: true
}));

app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/ocr', ocrRoutes);
app.use('/teachers', teachersRoute);
app.use('/admins', adminRoute);
app.use('/students', studentRoute);
app.use('/templates', templateRoutes);
app.use('/scan-jobs', scanJobsRoute);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });
