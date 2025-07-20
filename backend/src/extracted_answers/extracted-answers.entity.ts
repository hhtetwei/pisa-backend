
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { OCRResult } from '../ocr/ocr.entity';

@Entity('extracted_answers')
export class ExtractedAnswer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  questionId!: string; 

  @Column()
  type!: string;
  @Column({ nullable: true })
  detectedAnswer!: string; 

  @Column({ nullable: true })
  detectedText!: string; 


  @Column('float', { nullable: true })
  score?: number;

  @Column('simple-array', { nullable: true })
  boundingBox!: number[]; 

  @ManyToOne(() => OCRResult, ocrResult => ocrResult.questions)
  ocrResult!: OCRResult;
}