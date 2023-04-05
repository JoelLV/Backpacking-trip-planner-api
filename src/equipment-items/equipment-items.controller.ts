import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { EquipmentItemsService } from './equipment-items.service';
import { CreateEquipmentItemDto } from './dto/create-equipment-item.dto';
import { UpdateEquipmentItemDto } from './dto/update-equipment-item.dto';

@Controller('equipment-items')
export class EquipmentItemsController {
    constructor(
        private readonly equipmentItemsService: EquipmentItemsService,
    ) {}

    @Post()
    create(@Body() createEquipmentItemDto: CreateEquipmentItemDto) {
        return this.equipmentItemsService.create(createEquipmentItemDto);
    }

    @Get()
    findAll() {
        return this.equipmentItemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.equipmentItemsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateEquipmentItemDto: UpdateEquipmentItemDto,
    ) {
        return this.equipmentItemsService.update(+id, updateEquipmentItemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.equipmentItemsService.remove(+id);
    }
}
