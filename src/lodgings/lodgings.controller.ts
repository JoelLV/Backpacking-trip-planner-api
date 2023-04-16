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
import { LodgingsService } from './lodgings.service';
import { CreateLodgingDto } from './dto/create-lodging.dto';
import { UpdateLodgingDto } from './dto/update-lodging.dto';
import { Lodging } from './model/lodging.model';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('authentication', ['authentication'])
@Controller('lodgings')
export class LodgingsController {
    constructor(private readonly lodgingsService: LodgingsService) {}

    /**
     * Creates a new lodging entity and stores it
     * in the database.
     *
     * @param createLodgingDto dto used to fetch data for entity.
     * @returns a lodging entity object.
     */
    @Post()
    async create(@Body() createLodgingDto: CreateLodgingDto): Promise<Lodging> {
        const entity = await this.lodgingsService.create(createLodgingDto);
        return {
            id: entity.id,
            cost: entity.cost,
            name: entity.name,
            description: entity.description,
            address: entity.address,
            phone: entity.phone,
            email: entity.email,
            rating: entity.rating,
        };
    }

    /**
     * Finds all lodging entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of lodging entities.
     */
    @Get()
    findAll(): Promise<Lodging[]> {
        return this.lodgingsService.findAll();
    }

    /**
     * Finds a single lodging entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of lodging to find.
     * @returns the entity found.
     */
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Lodging> {
        return this.lodgingsService.findOne(+id);
    }

    /**
     * Fully updates a single lodging entity using the id
     * provided and the dto.
     *
     * @param id id of entity to edit.
     * @param createLodgingDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Put(':id')
    fullUpdate(
        @Param('id') id: string,
        @Body() createLodgingDto: CreateLodgingDto,
    ): Promise<Lodging> {
        return this.lodgingsService.update(+id, createLodgingDto);
    }

    /**
     * Partially updates a single lodging entity using
     * the id provided and the dto.
     *
     * @param id id of entity to edit.
     * @param updateLodgingDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateLodgingDto: UpdateLodgingDto,
    ): Promise<Lodging> {
        if (
            updateLodgingDto.address === undefined &&
            updateLodgingDto.cost === undefined &&
            updateLodgingDto.description === undefined &&
            updateLodgingDto.email === undefined &&
            updateLodgingDto.name === undefined &&
            updateLodgingDto.phone === undefined &&
            updateLodgingDto.rating === undefined
        ) {
            throw new BadRequestException(
                'Must provide at least one property.',
            );
        }
        return this.lodgingsService.update(+id, updateLodgingDto);
    }

    /**
     * Deletes the lodging entity using
     * the id provided.
     *
     * @param id id of entity to delete.
     * @returns the deleted entity.
     */
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Lodging> {
        return this.lodgingsService.remove(+id);
    }
}
