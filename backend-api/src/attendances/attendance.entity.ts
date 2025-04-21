import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClassDay } from '../class-days/class-day.entity';
import { Student } from '../students/student.entity';
import { AttendanceStatus } from '../enums/attendance-status.enum';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_cpf', referencedColumnName: 'cpf' })
  student: Student;

  @ManyToOne(() => ClassDay)
  @JoinColumn({ name: 'class_day_id', referencedColumnName: 'id' })
  class_day: ClassDay;

  @Column()
  responsible_id: number;

  @UpdateDateColumn()
  modified_at: Date;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
  })
  status: AttendanceStatus;
}
