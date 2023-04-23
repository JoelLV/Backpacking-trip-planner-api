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
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './model/trip.model';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { NumIdRequestParam } from 'src/validators/num-id-request-param.validator';

@ApiTags('Trips')
@ApiSecurity('authentication', ['authentication'])
@Controller('trips')
export class TripsController {
    constructor(private readonly tripsService: TripsService) {}

    /**
     * Creates a new trip entity and stores it
     * in the database.
     *
     * @param createTripDto dto used to fetch data for entity.
     * @returns a trip entity entity object.
     */
    @Post()
    async create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
        const entity = await this.tripsService.create(createTripDto);
        return {
            id: entity.id,
            equipment_set_id: entity.equipment_set.id,
            trail_id: entity.trail.id,
            user_id: entity.user.id,
            lodging_id: entity.lodging.id,
            transportation_id: entity.transporation.id,
            planned_date: entity.planned_date,
        };
    }

    /**
     * Finds all trip entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of trip entities.
     */
    @Get()
    async findAll(): Promise<Trip[]> {
        const entities = await this.tripsService.findAll();
        return entities.map((entity) => {
            return {
                id: entity.id,
                equipment_set_id: entity.equipment_set.id,
                trail_id: entity.trail.id,
                user_id: entity.user.id,
                lodging_id: entity.lodging.id,
                transportation_id: entity.transporation.id,
                planned_date: entity.planned_date,
            };
        });
    }

    /**
     * Finds a single trip entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of trip to find.
     * @returns the entity found.
     */
    @Get(':id')
    async findOne(@Param() { id }: NumIdRequestParam): Promise<Trip> {
        const entity = await this.tripsService.findOne(+id);
        return {
            id: entity.id,
            equipment_set_id: entity.equipment_set.id,
            trail_id: entity.trail.id,
            user_id: entity.user.id,
            lodging_id: entity.lodging.id,
            transportation_id: entity.transporation.id,
            planned_date: entity.planned_date,
        };
    }

    /**
     * Fully updates a single equipment item entity using the id
     * provided and the dto.
     *
     * @param id id of entity to edit.
     * @param createTripDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Put(':id')
    async fullUpdate(
        @Param() { id }: NumIdRequestParam,
        @Body() createTripDto: CreateTripDto,
    ): Promise<Trip> {
        const entity = await this.tripsService.update(+id, createTripDto);
        return {
            id: entity.id,
            equipment_set_id: entity.equipment_set.id,
            trail_id: entity.trail.id,
            user_id: entity.user.id,
            lodging_id: entity.lodging.id,
            transportation_id: entity.transporation.id,
            planned_date: entity.planned_date,
        };
    }

    /**
     * Partially updates a single trip entity using
     * the id provided and the dto.
     *
     * @param id id of entity to edit.
     * @param updateTripDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Patch(':id')
    async update(
        @Param() { id }: NumIdRequestParam,
        @Body() updateTripDto: UpdateTripDto,
    ): Promise<Trip> {
        if (
            updateTripDto.equipment_set_id === undefined &&
            updateTripDto.lodging_id === undefined &&
            updateTripDto.trail_id === undefined &&
            updateTripDto.transportation_id === undefined &&
            updateTripDto.user_id === undefined
        ) {
            throw new BadRequestException(
                'Must specify at least one property.',
            );
        }

        const entity = await this.tripsService.update(+id, updateTripDto);
        return {
            id: entity.id,
            equipment_set_id: entity.equipment_set.id,
            trail_id: entity.trail.id,
            user_id: entity.user.id,
            lodging_id: entity.lodging.id,
            transportation_id: entity.transporation.id,
            planned_date: entity.planned_date,
        };
    }

    /**
     * Deletes the equipment item entity using
     * the id provided.
     *
     * @param id id of entity to delete.
     * @returns the deleted entity.
     */
    @Delete(':id')
    async remove(@Param() { id }: NumIdRequestParam): Promise<Trip> {
        const entity = await this.tripsService.remove(+id);
        return {
            id: entity.id,
            equipment_set_id: entity.equipment_set.id,
            trail_id: entity.trail.id,
            user_id: entity.user.id,
            lodging_id: entity.lodging.id,
            transportation_id: entity.transporation.id,
            planned_date: entity.planned_date,
        };
    }
}
