
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { TemplateRegion } from '../template_regions/template-regions.entity';


@Entity('templates')
export class Template extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column()
  createdBy!: string; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @OneToMany(() => TemplateRegion, region => region.template, { cascade: true })
  regions!: TemplateRegion[];
}