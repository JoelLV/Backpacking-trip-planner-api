import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGearItemDto } from './dto/create-gear-item.dto';
import { UpdateGearItemDto } from './dto/update-gear-item.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { GearItem } from './entities/gear-item.entity';
import { Loaded } from '@mikro-orm/core';

@Injectable()
export class GearItemsService {
    constructor(private em: EntityManager) {}

    /**
     * Creates a new gear item entity and stores it
     * in the database.
     *
     * @param createGearItemDto dto used to fetch data needed for entity.
     * @returns the newly created entity.
     */
    async create(createGearItemDto: CreateGearItemDto): Promise<GearItem> {
        const gearItem: GearItem = new GearItem(createGearItemDto);
        await this.em.persistAndFlush(gearItem);

        return gearItem;
    }

    /**
     * Returns all gear item entities currently
     * stored in the database.
     *
     * @returns an array of entities.
     */
    findAll(): Promise<Loaded<GearItem>[]> {
        return this.em.find(GearItem, {});
    }

    /**
     * Finds a single gear item entity and
     * returns it if found. If not found,
     * a not found error is raised.
     *
     * @param id id of gear item entity to find.
     * @returns the entity found.
     */
    async findOne(id: number): Promise<Loaded<GearItem>> {
        const gearItem: Loaded<GearItem> | null = await this.em.findOne(
            GearItem,
            {
                id,
            },
        );

        if (!gearItem) {
            throw new NotFoundException('Gear item specified not found.');
        }
        return gearItem;
    }

    /**
     * Updates a gear item entity if found using dto. Raises
     * not found error if not found.
     *
     * @param id id of gear item entity to find.
     * @param gearItemDto dto used to update gear item entity.
     * @returns the updated gear item entity.
     */
    async update(
        id: number,
        gearItemDto: UpdateGearItemDto | CreateGearItemDto,
    ): Promise<Loaded<GearItem>> {
        const gearItem: Loaded<GearItem> = await this.findOne(id);
        gearItem.name = gearItemDto.name ?? gearItem.name;
        gearItem.is_consumable =
            gearItemDto.is_consumable ?? gearItem.is_consumable;

        await this.em.persistAndFlush(gearItem);
        return gearItem;
    }

    /**
     * Removes a gear item entity if found using id.
     * Raises not found error if not found.
     *
     * @param id id of gear item entity to find.
     * @returns the entity eliminated.
     */
    async remove(id: number): Promise<Loaded<GearItem>> {
        const gearItem: Loaded<GearItem> = await this.findOne(id);
        await this.em.removeAndFlush(gearItem);

        return gearItem;
    }
}
