import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentPackageService } from './equipment-package.service';
import { CreateEquipmentPackageDto } from './dto/create-equipment-package.dto';
import { UpdateEquipmentPackageDto } from './dto/update-equipment-package.dto';

@Controller('equipment-package')
export class EquipmentPackageController {
  constructor(private readonly equipmentPackageService: EquipmentPackageService) {}

  @Post()
  create(@Body() createEquipmentPackageDto: CreateEquipmentPackageDto) {
    return this.equipmentPackageService.create(createEquipmentPackageDto);
  }

  @Get()
  findAll() {
    return this.equipmentPackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentPackageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentPackageDto: UpdateEquipmentPackageDto) {
    return this.equipmentPackageService.update(+id, updateEquipmentPackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentPackageService.remove(+id);
  }
}
