import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { AccountStatus, UserType } from "./types";
import { OCRResult } from "../ocr/ocr.entity";



@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, name: 'email', unique: true })
  email!: string;

  @Column({ name: 'password' })
  password!: string;

  @Column({ name: 'salt' , default: ''})
  salt!: string;

  @Column({ length: 100, name: 'name' })
  name!: string;

  @Column({ length: 100, name: 'surname' })
  surname!: string;

  @Column({ length: 100, name: 'phone_number' })
  phoneNumber!: string;

  @Column({
    name: 'account_status',
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.OFFLINE,
  })
  accountStatus!: AccountStatus;

  @Column({
    name: 'type',
    type: 'enum',
    enum: UserType,
  })
  type!: UserType;

  @Column({ name: 'has_logged_in', type: 'boolean', default: false })
  hasLoggedIn!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ name: 'logged_in_at', type: 'timestamp', nullable: true })
  loggedInAt!: Date | null;

  ocrResults: OCRResult[] = []
}