import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ClassDaysService } from './class-days.service';
import { CreateClassDayDto } from './dto/create-class-day.dto';
import { UpdateClassDayDto } from './dto/update-class-day.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('class-days')
export class ClassDaysController {
  constructor(private readonly classDaysService: ClassDaysService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma aula' })
  create(@Body() createClassDayDto: CreateClassDayDto) {
    return this.classDaysService.create(createClassDayDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retorna aulas de acordo com o código da turma e/ou data',
  })
  @ApiQuery({ name: 'class_group_id', required: false, type: String })
  @ApiQuery({ name: 'date', required: false, type: String })
  findClassDays(
    @Query('class_group_id') class_group_id: string,
    @Query('date') date: string,
  ) {
    if (class_group_id && date) {
      const convertedDate = new Date(date);
      return this.classDaysService.findByClassGroupIdAndDate(
        +class_group_id,
        convertedDate,
      );
    }
    if (class_group_id) {
      return this.classDaysService.findByClassGroupId(+class_group_id);
    }
    if (date) {
      const convertedDate = new Date(date);
      return this.classDaysService.findByDate(convertedDate);
    }
    return this.classDaysService.findAll();
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza uma aula' })
  @ApiQuery({ name: 'class_group_id', required: true, type: String })
  @ApiQuery({ name: 'date', required: true, type: String })
  update(
    @Query('class_group_id') id: string,
    @Query('date') date: string,
    @Body() updateClassDayDto: UpdateClassDayDto,
  ) {
    return this.classDaysService.update(+id, updateClassDayDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta uma aula' })
  remove(@Query('id') id: string) {
    return this.classDaysService.remove(+id);
  }
}
