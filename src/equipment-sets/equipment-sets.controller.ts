import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentSetsService } from './equipment-sets.service';
import { CreateEquipmentSetDto } from './dto/create-equipment-set.dto';
import { UpdateEquipmentSetDto } from './dto/update-equipment-set.dto';

@Controller('equipment-sets')
export class EquipmentSetsController {
  constructor(private readonly equipmentSetsService: EquipmentSetsService) {}

  @Post()
  create(@Body() createEquipmentSetDto: CreateEquipmentSetDto) {
    return this.equipmentSetsService.create(createEquipmentSetDto);
  }

  @Get()
  findAll() {
    return this.equipmentSetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentSetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentSetDto: UpdateEquipmentSetDto) {
    return this.equipmentSetsService.update(+id, updateEquipmentSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentSetsService.remove(+id);
  }
}
