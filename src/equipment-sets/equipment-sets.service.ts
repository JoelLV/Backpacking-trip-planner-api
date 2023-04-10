import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipmentSetDto } from './dto/create-equipment-set.dto';
import { UpdateEquipmentSetDto } from './dto/update-equipment-set.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { EquipmentSet } from './entities/equipment-set.entity';
import { Loaded } from '@mikro-orm/core';

@Injectable()
export class EquipmentSetsService {
    constructor(private em: EntityManager) {}

    /**
     * Creates a new equipment set entity and stores it
     * in the database.
     *
     * @param createEquipmentSetDto dto used to fetch data needed for entity.
     * @returns the newly created entity.
     */
    async create(
        createEquipmentSetDto: CreateEquipmentSetDto,
    ): Promise<EquipmentSet> {
        const equipmentSet: EquipmentSet = new EquipmentSet(
            createEquipmentSetDto,
        );
        await this.em.persistAndFlush(equipmentSet);

        return equipmentSet;
    }

    /**
     * Returns all equipment set entities currently
     * stored in the database.
     *
     * @returns an array of entities.
     */
    findAll(): Promise<Loaded<EquipmentSet>[]> {
        return this.em.find(EquipmentSet, {});
    }

    /**
     * Finds a single equipment set entity and
     * returns it if found. If not found,
     * a not found error is raised.
     *
     * @param id id of equipment set entity to find.
     * @returns the entity found.
     */
    async findOne(id: number): Promise<Loaded<EquipmentSet>> {
        const equipmentSet: Loaded<EquipmentSet> | null = await this.em.findOne(
            EquipmentSet,
            {
                id,
            },
        );

        if (!equipmentSet) {
            throw new NotFoundException();
        }
        return equipmentSet;
    }

    /**
     * Updates a equipment set entity if found using dto. Raises
     * not found error if not found.
     *
     * @param id id of equipment set entity to find.
     * @param updateEquipmentSetDto dto used to update equipment set entity.
     * @returns the updated equipment set entity.
     */
    async update(
        id: number,
        updateEquipmentSetDto: UpdateEquipmentSetDto | CreateEquipmentSetDto,
    ): Promise<Loaded<EquipmentSet>> {
        const equipmentSet: Loaded<EquipmentSet> = await this.findOne(id);
        equipmentSet.description =
            updateEquipmentSetDto.description ?? equipmentSet.description;
        equipmentSet.name = updateEquipmentSetDto.name ?? equipmentSet.name;

        await this.em.persistAndFlush(equipmentSet);
        return equipmentSet;
    }

    /**
     * Removes a equipment set entity if found using id.
     * Raises not found error if not found.
     *
     * @param id id of equipment set entity to find.
     * @returns the entity eliminated.
     */
    async remove(id: number): Promise<Loaded<EquipmentSet>> {
        const equipmentSet: Loaded<EquipmentSet> = await this.findOne(id);
        this.em.removeAndFlush(equipmentSet);

        return equipmentSet;
    }
}
