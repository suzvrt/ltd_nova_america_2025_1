import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  cpf: number;

  @ApiProperty()
  fullName: string;
}
