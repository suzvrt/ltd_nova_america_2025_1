import { PartialType } from '@nestjs/mapped-types';
import { CreateClassGroupDto } from './create-class-group.dto';

export class UpdateClassGroupDto extends PartialType(CreateClassGroupDto) {
  start_date?: Date;
  end_date?: Date;
  start_time?: Date;
  end_time?: Date;
  week_day?: string;
  unit?: string;
  teacher_id?: number;
}
