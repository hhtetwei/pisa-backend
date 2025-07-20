// src/grades/grade.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { OCRResult } from '../ocr/ocr.entity';

@Entity('grades')
export class Grade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => OCRResult)
  ocrResult!: OCRResult;

  @Column()
  studentId!: string;

  @Column('float')
  score!: number;

  @Column('jsonb')
  detailedScores!: { questionId: string; correct: boolean; detected: string | null; expected: string | null }[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  gradedAt!: Date;
}
