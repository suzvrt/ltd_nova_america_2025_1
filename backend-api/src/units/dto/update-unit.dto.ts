import { PartialType } from '@nestjs/mapped-types';
import { CreateUnitDto } from './create-unit.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUnitDto extends PartialType(CreateUnitDto) {
  @ApiProperty()
  name?: string;
}
