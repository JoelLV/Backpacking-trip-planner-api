import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { LodgingsService } from 'src/lodgings/lodgings.service';
import { TransportationsService } from 'src/transportations/transportations.service';
import { UsersService } from 'src/users/users.service';
import { TrailsService } from 'src/trails/trails.service';
import { EquipmentSetsService } from 'src/equipment-sets/equipment-sets.service';
import { Lodging } from 'src/lodgings/entities/lodging.entity';
import { Transportation } from 'src/transportations/entities/transportation.entity';
import { User } from 'src/users/entities/user.entity';
import { Trail } from 'src/trails/entities/trail.entity';
import { EquipmentSet } from 'src/equipment-sets/entities/equipment-set.entity';
import { Trip } from './entities/trip.entity';
import { Loaded } from '@mikro-orm/core';

@Injectable()
export class TripsService {
    constructor(
        private em: EntityManager,
        private lodgingsService: LodgingsService,
        private transportationsService: TransportationsService,
        private usersService: UsersService,
        private traisService: TrailsService,
        private equipmentSetsService: EquipmentSetsService,
    ) {}

    /**
     * Creates a new trip entity and stores it
     * in the database.
     *
     * @param createTripDto dto used to fetch data needed for entity.
     * @returns the newly created entity.
     */
    async create(createTripDto: CreateTripDto) {
        const lodging: Loaded<Lodging> = await this.lodgingsService.findOne(
            createTripDto.lodging_id,
        );
        const transportation: Loaded<Transportation> =
            await this.transportationsService.findOne(
                createTripDto.transportation_id,
            );
        const user: Loaded<User> = await this.usersService.findOne(
            createTripDto.user_id,
        );
        const trail: Loaded<Trail> = await this.traisService.findOne(
            createTripDto.trail_id,
        );
        const equipmentSet: Loaded<EquipmentSet> =
            await this.equipmentSetsService.findOne(
                createTripDto.equipment_set_id,
            );
        const trip: Trip = new Trip();

        trip.equipment_set = equipmentSet;
        trip.lodging = lodging;
        trip.trail = trail;
        trip.transporation = transportation;
        trip.user = user;
        trip.planned_date = createTripDto.planned_date;

        await this.em.persistAndFlush(trip);
        return trip;
    }

    /**
     * Returns all trip entities currently
     * stored in the database.
     *
     * @returns an array of entities.
     */
    findAll() {
        return this.em.find(Trip, {});
    }

    /**
     * Finds a single trip entity and
     * returns it if found. If not found,
     * a not found error is raised.
     *
     * @param id id of trip entity to find.
     * @returns the entity found.
     */
    async findOne(id: number) {
        const trip: Loaded<Trip> | null = await this.em.findOne(Trip, { id });

        if (!trip) {
            throw new NotFoundException();
        }
        return trip;
    }

    /**
     * Updates a trip entity if found using dto. Raises
     * not found error if not found.
     *
     * @param id id of trip entity to find.
     * @param tripDto dto used to update trip entity.
     * @returns the updated trip entity.
     */
    async update(id: number, tripDto: UpdateTripDto | CreateTripDto) {
        const trip: Loaded<Trip> = await this.findOne(id);

        trip.planned_date = tripDto.planned_date ?? trip.planned_date;
        if (tripDto.equipment_set_id !== undefined) {
            trip.equipment_set = await this.equipmentSetsService.findOne(
                tripDto.equipment_set_id,
            );
        }
        if (tripDto.lodging_id !== undefined) {
            trip.lodging = await this.lodgingsService.findOne(
                tripDto.lodging_id,
            );
        }
        if (tripDto.trail_id !== undefined) {
            trip.trail = await this.traisService.findOne(tripDto.trail_id);
        }
        if (tripDto.transportation_id !== undefined) {
            trip.transporation = await this.transportationsService.findOne(
                tripDto.transportation_id,
            );
        }
        if (tripDto.user_id !== undefined) {
            trip.user = await this.usersService.findOne(tripDto.user_id);
        }

        await this.em.persistAndFlush(trip);
        return trip;
    }

    /**
     * Removes a trip entity if found using id.
     * Raises not found error if not found.
     *
     * @param id id of trip entity to find.
     * @returns the entity eliminated.
     */
    async remove(id: number) {
        const trip: Trip = await this.findOne(id);
        await this.em.removeAndFlush(trip);

        return trip;
    }
}
