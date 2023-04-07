import { Injectable } from '@nestjs/common';
import { CreateLodgingDto } from './dto/create-lodging.dto';
import { UpdateLodgingDto } from './dto/update-lodging.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Lodging } from './entities/lodging.entity';
import { Loaded } from "@mikro-orm/core"
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class LodgingsService {
    constructor(private em: EntityManager) {}

    /**
     * Creates a new lodging entity and stores it
     * in the database.
     *
     * @param createLodgingDto dto used to fetch data needed for entity.
     * @returns the newly created entity.
     */
    async create(createLodgingDto: CreateLodgingDto): Promise<Lodging> {
        const lodging: Lodging = new Lodging(createLodgingDto);
        await this.em.persistAndFlush(lodging);

        return lodging;
    }

    /**
     * Returns all lodging entities currently
     * stored in the database.
     *
     * @returns an array of entities.
     */
    findAll(): Promise<Loaded<Lodging>[]> {
        return this.em.find(Lodging, {});
    }

    /**
     * Finds a single lodging entity and
     * returns it if found. If not found,
     * a not found error is raised.
     *
     * @param id id of lodging entity to find.
     * @returns the entity found.
     */
    async findOne(id: number): Promise<Loaded<Lodging>> {
        const lodging: Loaded<Lodging> | null = await this.em.findOne(Lodging, {
            id,
        });

        if (!lodging) {
            throw new NotFoundException();
        }
        return lodging;
    }

    /**
     * Updates a lodging entity if found using dto. Raises
     * not found error if not found.
     *
     * @param id id of lodging entity to find.
     * @param lodgingDto dto used to update lodging entity.
     * @returns the updated lodging entity.
     */
    async update(id: number, lodgingDto: UpdateLodgingDto | CreateLodgingDto): Promise<Loaded<Lodging>> {
        const lodging: Loaded<Lodging> = await this.findOne(id);
        lodging.description = lodgingDto.description ?? lodging.description;
        lodging.name = lodgingDto.name ?? lodging.name;
        lodging.address = lodgingDto.address ?? lodging.address
        lodging.cost = lodgingDto.cost ?? lodging.cost
        lodging.email = lodgingDto.email ?? lodging.email
        lodging.phone = lodgingDto.phone ?? lodging.phone
        lodging.rating = lodgingDto.rating ?? lodging.rating

        await this.em.persistAndFlush(lodging);
        return lodging;
    }

    /**
     * Removes a lodging entity if found using id.
     * Raises not found error if not found.
     *
     * @param id id of lodging entity to find.
     * @returns the entity eliminated.
     */
    async remove(id: number): Promise<Loaded<Lodging>> {
        const lodging: Loaded<Lodging> = await this.findOne(id);
        this.em.removeAndFlush(lodging);

        return lodging;
    }
}
