import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma presença' })
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendancesService.create(createAttendanceDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Retorna as presenças de acordo com o CPF do aluno e/ou dia de aula',
  })
  @ApiQuery({ name: 'cpf', required: false, type: String })
  @ApiQuery({ name: 'class_day', required: false, type: String })
  findOne(@Query('cpf') cpf: string, @Query('class_day') class_day: string) {
    if (cpf && class_day) {
      const convertedDate = new Date(class_day);
      return this.attendancesService.findByStudentCpfAndClassDay(
        +cpf,
        convertedDate,
      );
    } else if (class_day && !cpf) {
      const convertedDate = new Date(class_day);
      return this.attendancesService.findByClassDay(convertedDate);
    } else if (cpf && !class_day) {
      return this.attendancesService.findByStudentId(+cpf);
    } else {
      return 'Entrada inválida. Insira CPF ou data da aula.';
    }
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza uma presença' })
  @ApiQuery({ name: 'cpf', required: true, type: String })
  @ApiQuery({ name: 'class_day', required: true, type: String })
  update(
    @Query('cpf') cpf: string,
    @Query('class_day') class_day: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendancesService.update(+cpf, updateAttendanceDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta uma presença' })
  remove(@Query('id') id: string) {
    return this.attendancesService.remove(+id);
  }
}
