import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ClassGroupsService } from './class-groups.service';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('class-groups')
export class ClassGroupsController {
  constructor(private readonly classGroupsService: ClassGroupsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma turma' })
  create(@Body() createClassGroupDto: CreateClassGroupDto) {
    return this.classGroupsService.create(createClassGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todas as turmas' })
  findAll() {
    return this.classGroupsService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todas as turmas ou a turma especificada' })
  @ApiQuery({ name: 'id', required: false, type: String })
  find(@Query('id') id: string) {
    if (id) {
      return this.classGroupsService.findOne(+id);
    }
    return this.classGroupsService.findAll();
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza uma turma' })
  @ApiQuery({ name: 'id', required: true, type: String })
  update(
    @Query('id') id: string,
    @Body() updateClassGroupDto: UpdateClassGroupDto,
  ) {
    return this.classGroupsService.update(+id, updateClassGroupDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta uma turma' })
  @ApiQuery({ name: 'id', required: true, type: String })
  remove(@Query('id') id: string) {
    return this.classGroupsService.remove(+id);
  }
}
