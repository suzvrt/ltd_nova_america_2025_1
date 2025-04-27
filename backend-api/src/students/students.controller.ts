import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { API_MESSAGES } from '../app.messages';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: API_MESSAGES.CONTROLLER.STUDENTS.CREATE })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: API_MESSAGES.CONTROLLER.STUDENTS.GET_ALL })
  @ApiQuery({ name: 'cpf', required: false, type: String, description: 'CPF do aluno' })
  find(@Query('cpf') cpf: string) {
    if (cpf) {
      return this.studentsService.findOne(+cpf);
    }
    return this.studentsService.findAll();
  }

  @Patch()
  @ApiOperation({ summary: API_MESSAGES.CONTROLLER.STUDENTS.UPDATE })
  @ApiQuery({ name: 'id', required: true, type: String })
  update(@Query('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete()
  @ApiOperation({ summary: API_MESSAGES.CONTROLLER.STUDENTS.DELETE })
  @ApiQuery({ name: 'id', required: true, type: String })
  remove(@Query('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
