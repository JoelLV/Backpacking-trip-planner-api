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
import { TransportationsService } from './transportations.service';
import { CreateTransportationDto } from './dto/create-transportation.dto';
import { UpdateTransportationDto } from './dto/update-transportation.dto';
import { Transportation } from './entities/transportation.entity';
import { Loaded } from '@mikro-orm/core';

interface TransportationReturn {
    id: number,
    cost: number,
    name: string,
    address: string,
    description: string
}
@Controller('transportations')
export class TransportationsController {
    constructor(
        private readonly transportationsService: TransportationsService,
    ) {}

    /**
     * Creates a new transportation entity and stores it
     * in the database.
     *
     * @param createTransportationDto dto used to fetch data for entity.
     * @returns the entity created.
     */
    @Post()
    async create(
        @Body() createTransportationDto: CreateTransportationDto,
    ): Promise<TransportationReturn> {
        const entity = await this.transportationsService.create(createTransportationDto);
        return {
            id: entity.id,
            cost: entity.cost,
            name: entity.name,
            address: entity.address,
            description: entity.description
        }
    }

    /**
     * Finds all transportation entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of transportation entities.
     */
    @Get()
    findAll(): Promise<TransportationReturn[]> {
        return this.transportationsService.findAll();
    }

    /**
     * Finds a single user entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of entity to find.
     * @returns the entity found.
     */
    @Get(':id')
    findOne(@Param('id') id: string): Promise<TransportationReturn> {
        return this.transportationsService.findOne(+id);
    }

    /**
     * Fully updates a single transportation entity using the id
     * provided and the dto.
     *
     * @param id id of entity to edit.
     * @param createUserDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Put(':id')
    fullUpdate(
        @Param('id') id: string,
        @Body() createTransporationDto: CreateTransportationDto,
    ): Promise<TransportationReturn> {
        return this.transportationsService.update(+id, createTransporationDto);
    }

    /**
     * Partially updates a single transportation entity using
     * the id provided and the dto.
     *
     * @param id id of entity to edit.
     * @param updateUserDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTransportationDto: UpdateTransportationDto,
    ): Promise<TransportationReturn> {
        if (
            updateTransportationDto.address === undefined &&
            updateTransportationDto.cost === undefined &&
            updateTransportationDto.description === undefined &&
            updateTransportationDto.name === undefined
        ) {
            throw new BadRequestException(
                'Must provide at least one property.',
            );
        }
        return this.transportationsService.update(+id, updateTransportationDto);
    }

    /**
     * Deletes the transportation entity using
     * the id provided.
     *
     * @param id id of entity to delete.
     * @returns the deleted entity.
     */
    @Delete(':id')
    remove(@Param('id') id: string): Promise<TransportationReturn> {
        return this.transportationsService.remove(+id);
    }
}
