import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,
  ) {}

  create(createAttendanceDto: CreateAttendanceDto) {
    const attendance = this.attendanceRepo.create(createAttendanceDto);
    return this.attendanceRepo.save(attendance);
  }

  findByStudentId(cpf: number) {
    return this.attendanceRepo.find({
      where: {
        student: { cpf: cpf },
      },
      relations: {
        student: true,
      },
    });
  }

  findByClassDay(classDay: Date) {
    return this.attendanceRepo.find({
      where: {
        class_day: { date: classDay },
      },
      relations: {
        class_day: true,
      },
    });
  }

  findByStudentCpfAndClassDay(cpf: number, classDay: Date) {
    return this.attendanceRepo.findOne({
      where: {
        student: { cpf: cpf },
        class_day: { date: classDay },
      },
      relations: {
        student: true,
        class_day: true,
      },
    });
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceRepo.update(id, updateAttendanceDto);
  }

  remove(id: number) {
    return this.attendanceRepo.delete(id);
  }
}
