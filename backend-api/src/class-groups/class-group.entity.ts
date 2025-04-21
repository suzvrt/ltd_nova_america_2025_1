import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('class_groups')
export class ClassGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  start_date: Date;

  @Column('date')
  end_date: Date;

  @Column('date')
  start_time: Date;

  @Column('date')
  end_time: Date;

  @Column()
  week_day: string;

  @Column()
  unit: string;

  @Column()
  teacher_id: number;
}
