import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassDay } from './class-day.entity';
import { CreateClassDayDto } from './dto/create-class-day.dto';
import { UpdateClassDayDto } from './dto/update-class-day.dto';

@Injectable()
export class ClassDaysService {
  constructor(
    @InjectRepository(ClassDay)
    private classDayRepo: Repository<ClassDay>,
  ) {}

  create(createClassDayDto: CreateClassDayDto) {
    const classDay = this.classDayRepo.create(createClassDayDto);
    return this.classDayRepo.save(classDay);
  }

  findAll() {
    return this.classDayRepo.find();
  }

  findByClassGroupId(id: number) {
    return this.classDayRepo.find({
      where: {
        class_group_id: id,
      },
      order: {
        date: 'ASC',
      },
    });
  }

  findByClassGroupIdAndDate(id: number, date: Date) {
    return this.classDayRepo.find({
      where: {
        class_group_id: id,
        date: date,
      },
      order: {
        date: 'ASC',
      },
    });
  }

  findByDate(date: Date) {
    return this.classDayRepo.find({
      where: {
        date: date,
      },
      order: {
        class_group_id: 'ASC',
      },
    });
  }

  update(id: number, updateClassDayDto: UpdateClassDayDto) {
    return this.classDayRepo.update(id, updateClassDayDto);
  }

  remove(id: number) {
    return this.classDayRepo.delete(id);
  }
}
