
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity } from 'typeorm';

import { User } from '../users/user.entity';
import { ScanJob } from '../scan_job/scan-job.entity';
import { ExtractedAnswer } from '../extracted_answers/extracted-answers.entity';

@Entity('ocr_results')
export class OCRResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  jobId!: string; 

  @Column({ nullable: true })
  studentId!: string; 

  @ManyToOne(() => ScanJob, scanJob => scanJob.ocrResult)
  scanJob!: ScanJob;

  @Column('float', { nullable: true })
  score?: number;
  
  @OneToMany(() => ExtractedAnswer, answer => answer.ocrResult, { cascade: true })
  questions!: ExtractedAnswer[];

  @ManyToOne(() => User, user => user.ocrResults)
  uploadedBy!: User;
}