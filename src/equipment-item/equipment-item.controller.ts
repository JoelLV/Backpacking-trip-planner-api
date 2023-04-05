import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { EquipmentItemService } from './equipment-item.service';
import { CreateEquipmentItemDto } from './dto/create-equipment-item.dto';
import { UpdateEquipmentItemDto } from './dto/update-equipment-item.dto';

@Controller('equipment-item')
export class EquipmentItemController {
    constructor(private readonly equipmentItemService: EquipmentItemService) {}

    @Post()
    create(@Body() createEquipmentItemDto: CreateEquipmentItemDto) {
        return this.equipmentItemService.create(createEquipmentItemDto);
    }

    @Get()
    findAll() {
        return this.equipmentItemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.equipmentItemService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateEquipmentItemDto: UpdateEquipmentItemDto,
    ) {
        return this.equipmentItemService.update(+id, updateEquipmentItemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.equipmentItemService.remove(+id);
    }
}
