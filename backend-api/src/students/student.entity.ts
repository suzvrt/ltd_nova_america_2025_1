import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ClassGroup } from '../class-groups/class-group.entity';

@Entity('students')
export class Student {
  @PrimaryColumn()
  cpf: number;

  @Column()
  fullName: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @Column('boolean', { default: true })
  is_active: boolean;

  @ManyToOne(() => ClassGroup)
  @JoinColumn({ name: 'class_group_id' })
  class_group: ClassGroup;
}
