import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateClassGroupDto {
  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  start_time: Date;

  @ApiProperty()
  end_time: Date;

  @ApiProperty()
  @Length(7)
  week_day: string;

  @ApiProperty()
  unit: string;

  @ApiProperty()
  teacher_id: number;
}
