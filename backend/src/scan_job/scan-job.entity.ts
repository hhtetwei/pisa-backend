
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { OCRResult } from '../ocr/ocr.entity';
import { Template } from '../templates/template.entity';

@Entity('scan_jobs')
export class ScanJob extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  status!: 'pending' | 'processing' | 'completed' | 'failed';

  @Column()
  documentUrl!: string; 

  @ManyToOne(() => Template) 
@JoinColumn({ name: 'templateId' })
template!: Template;
  
  @Column()
  templateId!: number; 

  @Column()
  pages!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @OneToOne(() => OCRResult, result => result.scanJob)
  ocrResult!: OCRResult;
}