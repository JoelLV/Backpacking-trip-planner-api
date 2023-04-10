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
import { EquipmentSetsService } from './equipment-sets.service';
import { CreateEquipmentSetDto } from './dto/create-equipment-set.dto';
import { UpdateEquipmentSetDto } from './dto/update-equipment-set.dto';

@Controller('equipment-sets')
export class EquipmentSetsController {
    constructor(private readonly equipmentSetsService: EquipmentSetsService) {}

    /**
     * Creates a new equipment set entity and stores it
     * in the database.
     *
     * @param createEquipmentSetDto dto used to fetch data for entity.
     * @returns a equipment set entity object.
     */
    @Post()
    create(@Body() createEquipmentSetDto: CreateEquipmentSetDto) {
        return this.equipmentSetsService.create(createEquipmentSetDto);
    }

    /**
     * Finds all equipment set entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of equipment set entities.
     */
    @Get()
    findAll() {
        return this.equipmentSetsService.findAll();
    }

    /**
     * Finds a single equipment set entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of equipment set to find.
     * @returns the entity found.
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.equipmentSetsService.findOne(+id);
    }

    /**
     * Fully updates a single equipment set entity using the id
     * provided and the dto.
     *
     * @param id id of entity to edit.
     * @param createEquipmentSetDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Put(':id')
    fullUpdate(
        @Param('id') id: string,
        @Body() createEquipmentSetDto: CreateEquipmentSetDto,
    ) {
        return this.equipmentSetsService.update(+id, createEquipmentSetDto);
    }

    /**
     * Partially updates a single equipment set entity using
     * the id provided and the dto.
     *
     * @param id id of entity to edit.
     * @param updateEquipmentSetDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateEquipmentSetDto: UpdateEquipmentSetDto,
    ) {
        if (
            updateEquipmentSetDto.description === undefined &&
            updateEquipmentSetDto.name === undefined
        ) {
            throw new BadRequestException(
                'Must provide at least one property.',
            );
        }
        return this.equipmentSetsService.update(+id, updateEquipmentSetDto);
    }

    /**
     * Deletes the equipment set entity using
     * the id provided.
     *
     * @param id id of entity to delete.
     * @returns the deleted entity.
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.equipmentSetsService.remove(+id);
    }
}
