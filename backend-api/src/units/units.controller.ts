import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma unidade' })
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitsService.create(createUnitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todas as unidades ou a especificada' })
  @ApiQuery({ name: 'id', required: false, type: String })
  find(@Query('id') id: string) {
    console.log('id', id);
    if (id && id.length > 0) {
      return this.unitsService.findOne(+id);
    }
    return this.unitsService.findAll();
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza uma unidade' })
  @ApiQuery({ name: 'id', required: true, type: String })
  @ApiQuery({ name: 'updateUnitDto', required: true, type: UpdateUnitDto })
  update(@Query('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitsService.update(+id, updateUnitDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta uma unidade' })
  @ApiQuery({ name: 'id', required: true, type: String })
  remove(@Query('id') id: string) {
    return this.unitsService.remove(+id);
  }
}
