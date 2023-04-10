import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
    BadRequestException,
} from '@nestjs/common';
import { EquipmentItemsService } from './equipment-items.service';
import { CreateEquipmentItemDto } from './dto/create-equipment-item.dto';
import { UpdateEquipmentItemDto } from './dto/update-equipment-item.dto';
import { Loaded } from '@mikro-orm/core';
import { EquipmentItem } from './entities/equipment-item.entity';

@Controller('equipment-items')
export class EquipmentItemsController {
    constructor(
        private readonly equipmentItemsService: EquipmentItemsService,
    ) {}

    /**
     * Creates a new equipment item entity and stores it
     * in the database.
     *
     * @param createEquipmentItemDto dto used to fetch data for entity.
     * @returns a equipment entity entity object.
     */
    @Post()
    create(
        @Body() createEquipmentItemDto: CreateEquipmentItemDto,
    ): Promise<EquipmentItem> {
        return this.equipmentItemsService.create(createEquipmentItemDto);
    }

    /**
     * Finds all equipment item entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of equipment item entities.
     */
    @Get()
    findAll(): Promise<Loaded<EquipmentItem>[]> {
        return this.equipmentItemsService.findAll();
    }

    /**
     * Finds a single equipment item entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of equipment item to find.
     * @returns the entity found.
     */
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Loaded<EquipmentItem>> {
        return this.equipmentItemsService.findOne(+id);
    }

    /**
     * Fully updates a single equipment item entity using the id
     * provided and the dto.
     *
     * @param id id of entity to edit.
     * @param createEquipmentItemDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Put(':id')
    fullUpdate(
        @Param('id') id: string,
        @Body() createEquipmentItemDto: CreateEquipmentItemDto,
    ): Promise<Loaded<EquipmentItem>> {
        return this.equipmentItemsService.update(+id, createEquipmentItemDto);
    }

    /**
     * Partially updates a single equipment item entity using
     * the id provided and the dto.
     *
     * @param id id of entity to edit.
     * @param updateEquipmentItemDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateEquipmentItemDto: UpdateEquipmentItemDto,
    ): Promise<Loaded<EquipmentItem>> {
        if (
            updateEquipmentItemDto.equipment_set_id === undefined &&
            updateEquipmentItemDto.gear_item_id === undefined &&
            updateEquipmentItemDto.quantity === undefined
        ) {
            throw new BadRequestException(
                'Must provide at least one property.',
            );
        }

        return this.equipmentItemsService.update(+id, updateEquipmentItemDto);
    }

    /**
     * Deletes the equipment item entity using
     * the id provided.
     *
     * @param id id of entity to delete.
     * @returns the deleted entity.
     */
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Loaded<EquipmentItem>> {
        return this.equipmentItemsService.remove(+id);
    }
}
