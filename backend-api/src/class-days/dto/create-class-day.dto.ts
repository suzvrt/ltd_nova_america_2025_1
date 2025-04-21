import { ApiProperty } from '@nestjs/swagger';
import { ClassDayStatus } from 'src/enums/class-day-status.enum';

export class CreateClassDayDto {
  @ApiProperty({ type: Number })
  class_group_id: number;

  @ApiProperty()
  date: Date;

  @ApiProperty({ enum: ClassDayStatus, default: ClassDayStatus.DRAFT })
  status: ClassDayStatus;
}
