import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { GearItemsService } from './gear-items.service';
import { CreateGearItemDto } from './dto/create-gear-item.dto';
import { UpdateGearItemDto } from './dto/update-gear-item.dto';

@Controller('gear-items')
export class GearItemsController {
    constructor(private readonly gearItemsService: GearItemsService) {}

    @Post()
    create(@Body() createGearItemDto: CreateGearItemDto) {
        return this.gearItemsService.create(createGearItemDto);
    }

    @Get()
    findAll() {
        return this.gearItemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.gearItemsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateGearItemDto: UpdateGearItemDto,
    ) {
        return this.gearItemsService.update(+id, updateGearItemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.gearItemsService.remove(+id);
    }
}
