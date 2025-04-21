import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}
  create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepo.create(createStudentDto);
    return this.studentRepo.save(student);
  }

  findAll() {
    return this.studentRepo.find();
  }

  findOne(cpf: number) {
    return this.studentRepo.find({
      where: {
        cpf: cpf,
      },
    });
  }

  update(cpf: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepo.update(cpf, updateStudentDto);
  }

  remove(cpf: number) {
    return this.studentRepo.delete(cpf);
  }
}
