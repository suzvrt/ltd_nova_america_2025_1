import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Class } from '../classes/class.entity';
import { User } from '../users/user.entity';
import { AttendanceStatus } from '../enums/attendance-status.enum';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => Class, (cls) => cls.attendances)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ManyToOne(() => User, (student) => student.attendances)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @Column()
  status: AttendanceStatus;
}
