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
import { GearItemsService } from './gear-items.service';
import { CreateGearItemDto } from './dto/create-gear-item.dto';
import { UpdateGearItemDto } from './dto/update-gear-item.dto';
import { GearItem } from './model/gear-item.model';

@Controller('gear-items')
export class GearItemsController {
    constructor(private readonly gearItemsService: GearItemsService) { }

    /**
     * Creates a new gear item entity and stores it
     * in the database.
     *
     * @param createGearItemDto dto used to fetch data for entity.
     * @returns a gear item entity object.
     */
    @Post()
    async create(
        @Body() createGearItemDto: CreateGearItemDto,
    ): Promise<GearItem> {
        const entity = await this.gearItemsService.create(createGearItemDto);
        return {
            id: entity.id,
            name: entity.name,
            is_consumable: entity.is_consumable
        }
    }

    /**
     * Finds all gear item entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of gear item entities.
     */
    @Get()
    async findAll(): Promise<GearItem[]> {
        return this.gearItemsService.findAll();
    }

    /**
     * Finds a single gear item entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of gear item to find.
     * @returns the entity found.
     */
    @Get(':id')
    findOne(@Param('id') id: string): Promise<GearItem> {
        return this.gearItemsService.findOne(+id);
    }

    /**
     * Fully updates a single gear item entity using the id
     * provided and the dto.
     *
     * @param id id of entity to edit.
     * @param createGearItemDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Put(':id')
    fullUpdate(
        @Param('id') id: string,
        @Body() createGearItemDto: CreateGearItemDto,
    ): Promise<GearItem> {
        return this.gearItemsService.update(+id, createGearItemDto);
    }

    /**
     * Partially updates a single gear item entity using
     * the id provided and the dto.
     *
     * @param id id of entity to edit.
     * @param updateGearItemDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateGearItemDto: UpdateGearItemDto,
    ): Promise<GearItem> {
        if (
            updateGearItemDto.is_consumable === undefined &&
            updateGearItemDto.name === undefined
        ) {
            throw new BadRequestException(
                'Must provide at least one property.',
            );
        }
        return this.gearItemsService.update(+id, updateGearItemDto);
    }

    /**
     * Deletes the gear item entity using
     * the id provided.
     *
     * @param id id of entity to delete.
     * @returns the deleted entity.
     */
    @Delete(':id')
    remove(@Param('id') id: string): Promise<GearItem> {
        return this.gearItemsService.remove(+id);
    }
}
