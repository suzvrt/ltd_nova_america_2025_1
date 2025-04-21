import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatus } from 'src/enums/attendance-status.enum';

export class CreateAttendanceDto {
  @ApiProperty()
  student_id: number;

  @ApiProperty()
  class_group_id: number;

  @ApiProperty()
  attendance_date: Date;

  @ApiProperty({ enum: AttendanceStatus })
  status: AttendanceStatus;
}
