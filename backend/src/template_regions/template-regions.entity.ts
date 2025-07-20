
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Template } from '../templates/template.entity';


@Entity('template_regions')
export class TemplateRegion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  regionId!: string; 

  @Column()
  type!: string; 

  @Column('simple-array')
  coordinates!: number[]; 

  @Column('simple-array', { nullable: true })
  options!: string[]; 

  @Column({ nullable: true })
  correctAnswer!: string;
  
  @Column({ nullable: true })          
  optionLabel?: string;  

  @ManyToOne(() => Template, template => template.regions)
  template!: Template;
}