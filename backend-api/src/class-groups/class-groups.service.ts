import { Injectable } from '@nestjs/common';
import { ClassGroup } from './class-group.entity';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassGroupsService {
  constructor(
    @InjectRepository(ClassGroup)
    private classGroupRepo: Repository<ClassGroup>,
  ) {}

  create(createClassGroupDto: CreateClassGroupDto) {
    const classGroup = this.classGroupRepo.create(createClassGroupDto);
    return this.classGroupRepo.save(classGroup);
  }

  findAll() {
    return this.classGroupRepo.find();
  }

  findOne(id: number) {
    return this.classGroupRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateClassGroupDto: UpdateClassGroupDto) {
    return this.classGroupRepo.update(id, updateClassGroupDto);
  }

  remove(id: number) {
    return this.classGroupRepo.delete(id);
  }
}
