import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransportationDto } from './dto/create-transportation.dto';
import { UpdateTransportationDto } from './dto/update-transportation.dto';
import { EntityManager, Loaded } from '@mikro-orm/core';
import { Transportation } from './entities/transportation.entity';

@Injectable()
export class TransportationsService {
    constructor(private em: EntityManager) {}

    /**
     * Creates a new transportation entity and stores it
     * in the database.
     *
     * @param createUserDto dto used to fetch data needed for entity.
     * @returns the newly created entity.
     */
    async create(
        createTransportationDto: CreateTransportationDto,
    ): Promise<Transportation> {
        const transportation: Transportation = new Transportation(
            createTransportationDto,
        );
        await this.em.persistAndFlush(transportation);

        return transportation;
    }

    /**
     * Returns all transportation entities currently
     * stored in the database.
     *
     * @returns an array of entities.
     */
    findAll(): Promise<Loaded<Transportation>[]> {
        return this.em.find(Transportation, {});
    }

    /**
     * Finds a single transportation entity and
     * returns it if found. If not found,
     * a not found error is raised.
     *
     * @param id id of transportation entity to find.
     * @returns the entity found.
     */
    async findOne(id: number): Promise<Loaded<Transportation>> {
        const transportation: Loaded<Transportation> | null =
            await this.em.findOne(Transportation, { id });

        if (!transportation) {
            throw new NotFoundException('Transportation specified not found.');
        }
        return transportation;
    }

    /**
     * Updates a transportation entity if found using dto. Raises
     * not found error if not found.
     *
     * @param id id of transportation entity to find.
     * @param transportationDto dto used to update transportation entity.
     * @returns the updated transportation entity.
     */
    async update(
        id: number,
        transportationDto: UpdateTransportationDto | CreateTransportationDto,
    ): Promise<Loaded<Transportation>> {
        const transportation: Loaded<Transportation> = await this.findOne(id);
        transportation.cost = transportationDto.cost ?? transportation.cost;
        transportation.name = transportationDto.name ?? transportation.name;
        transportation.address =
            transportationDto.address ?? transportation.address;
        transportation.description =
            transportationDto.description ?? transportation.description;

        await this.em.persistAndFlush(transportation);
        return transportation;
    }

    /**
     * Removes a transportation entity if found using id.
     * Raises not found error if not found.
     *
     * @param id id of transportation entity to find.
     * @returns the entity eliminated.
     */
    async remove(id: number): Promise<Loaded<Transportation>> {
        const transportation: Loaded<Transportation> = await this.findOne(id);
        await this.em.removeAndFlush(transportation);

        return transportation;
    }
}
