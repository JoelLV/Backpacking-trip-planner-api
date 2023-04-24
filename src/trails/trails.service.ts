import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Trail } from './entities/trail.entity';
import { Loaded } from '@mikro-orm/core';

@Injectable()
export class TrailsService {
    constructor(private em: EntityManager) {}

    /**
     * Creates a new trail entity and stores it
     * in the database.
     *
     * @param createTrailDto dto used to fetch data needed for entity.
     * @returns the newly created entity.
     */
    async create(createTrailDto: CreateTrailDto): Promise<Trail> {
        const trail: Trail = new Trail(createTrailDto);
        await this.em.persistAndFlush(trail);

        return trail;
    }

    /**
     * Returns all trail entities currently
     * stored in the database.
     *
     * @returns an array of entities.
     */
    findAll(): Promise<Loaded<Trail>[]> {
        return this.em.find(Trail, {});
    }

    /**
     * Finds a single trail entity and
     * returns it if found. If not found,
     * a not found error is raised.
     *
     * @param id id of trail entity to find.
     * @returns the entity found.
     */
    async findOne(id: number): Promise<Loaded<Trail>> {
        const trail: Loaded<Trail> | null = await this.em.findOne(Trail, {
            id,
        });

        if (!trail) {
            throw new NotFoundException('Trail specified not found.');
        }
        return trail;
    }

    /**
     * Updates a trail entity if found using dto. Raises
     * not found error if not found.
     *
     * @param id id of trail entity to find.
     * @param trailDto dto used to update trail entity.
     * @returns the updated trail entity.
     */
    async update(
        id: number,
        trailDto: UpdateTrailDto | CreateTrailDto,
    ): Promise<Loaded<Trail>> {
        const trail: Loaded<Trail> = await this.findOne(id);
        trail.description = trailDto.description ?? trail.description;
        trail.difficulty = trailDto.difficulty ?? trail.difficulty;
        trail.length = trailDto.length ?? trail.length;
        trail.location = trailDto.location ?? trail.location;
        trail.name = trailDto.name ?? trail.name;

        await this.em.persistAndFlush(trail);
        return trail;
    }

    /**
     * Removes a trail entity if found using id.
     * Raises not found error if not found.
     *
     * @param id id of trail entity to find.
     * @returns the entity eliminated.
     */
    async remove(id: number): Promise<Loaded<Trail>> {
        const trail: Loaded<Trail> = await this.findOne(id);
        await this.em.removeAndFlush(trail);

        return trail;
    }
}
