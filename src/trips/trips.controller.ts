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
    create(@Body() createTripDto: CreateTripDto) {
        return this.tripsService.create(createTripDto);
    }

    /**
     * Finds all trip entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of trip entities.
     */
    @Get()
    findAll() {
        return this.tripsService.findAll();
    }

    /**
     * Finds a single trip entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of trip to find.
     * @returns the entity found.
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tripsService.findOne(+id);
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
    fullUpdate(@Param('id') id: string, @Body() createTripDto: CreateTripDto) {
        return this.tripsService.update(+id, createTripDto);
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
    update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
        if (
            updateTripDto.equipment_set_id === undefined &&
            updateTripDto.lodging_id === undefined &&
            updateTripDto.trail_id === undefined &&
            updateTripDto.transportation_id === undefined &&
            updateTripDto.user_id === undefined
        ) {
            return new BadRequestException(
                'Must specify at least one property.',
            );
        }

        return this.tripsService.update(+id, updateTripDto);
    }

    /**
     * Deletes the equipment item entity using
     * the id provided.
     *
     * @param id id of entity to delete.
     * @returns the deleted entity.
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tripsService.remove(+id);
    }
}
