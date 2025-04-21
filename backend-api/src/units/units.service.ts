import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private unitRepo: Repository<Unit>,
  ) {}

  create(createUnitDto: CreateUnitDto) {
    const unit = this.unitRepo.create(createUnitDto);
    return this.unitRepo.save(unit);
  }

  findAll() {
    return this.unitRepo.find();
  }

  findOne(id: number) {
    return this.unitRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateUnitDto: UpdateUnitDto) {
    return this.unitRepo.update(id, updateUnitDto);
  }

  remove(id: number) {
    return this.unitRepo.delete(id);
  }
}
