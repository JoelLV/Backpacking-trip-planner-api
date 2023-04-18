import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateEquipmentItemDto } from './dto/create-equipment-item.dto';
import { UpdateEquipmentItemDto } from './dto/update-equipment-item.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { EquipmentSetsService } from 'src/equipment-sets/equipment-sets.service';
import { GearItemsService } from 'src/gear-items/gear-items.service';
import { GearItem } from 'src/gear-items/entities/gear-item.entity';
import { Loaded } from '@mikro-orm/core';
import { EquipmentSet } from 'src/equipment-sets/entities/equipment-set.entity';
import { EquipmentItem } from './entities/equipment-item.entity';

@Injectable()
export class EquipmentItemsService {
    constructor(
        private em: EntityManager,
        private equipmentSetService: EquipmentSetsService,
        private gearItemService: GearItemsService,
    ) {}

    /**
     * Checks if the combination of
     * the gear item and equipment set
     * properties already exist in the database.
     * If they do not exist, the function returns
     * true, otherwise false.
     *
     * @param equipmentItem The entity to check for uniqueness.
     * @param isNew Flag that determines whether the entity is new or not.
     * @returns true if the equipment item is unique, otherwise false.
     */
    async isUnique(equipmentItem: EquipmentItem, isNew: boolean): Promise<boolean> {
        const repeatedEquipmentItem: EquipmentItem | null =
            await this.em.findOne(EquipmentItem, {
                gear_item: equipmentItem.gear_item,
                equipment_set: equipmentItem.equipment_set,
            });
        if (isNew) {
            return !repeatedEquipmentItem
        } else {
            return !repeatedEquipmentItem || equipmentItem.id === repeatedEquipmentItem.id
        }
    }

    /**
     * Creates a new equipment item entity and stores it
     * in the database.
     *
     * @param createTrailDto dto used to fetch data needed for entity.
     * @returns the newly created entity.
     */
    async create(
        createEquipmentItemDto: CreateEquipmentItemDto,
    ): Promise<EquipmentItem> {
        const gearItem: Loaded<GearItem> = await this.gearItemService.findOne(
            createEquipmentItemDto.gear_item_id,
        );
        const equipmentSet: Loaded<EquipmentSet> =
            await this.equipmentSetService.findOne(
                createEquipmentItemDto.equipment_set_id,
            );
        const equipmentItem: Loaded<EquipmentItem> = new EquipmentItem(
            createEquipmentItemDto,
        );

        equipmentItem.gear_item = gearItem;
        equipmentItem.equipment_set = equipmentSet;

        const entityIsUnique: boolean = await this.isUnique(equipmentItem, true);
        if (entityIsUnique) {
            await this.em.persistAndFlush(equipmentItem);
        } else {
            throw new BadRequestException('Equipment item already exists.');
        }
        return equipmentItem;
    }

    /**
     * Returns all equipment items entities currently
     * stored in the database.
     *
     * @returns an array of entities.
     */
    findAll(): Promise<Loaded<EquipmentItem>[]> {
        return this.em.find(EquipmentItem, {});
    }

    /**
     * Finds a single equipment item entity and
     * returns it if found. If not found,
     * a not found error is raised.
     *
     * @param id id of equipment item entity to find.
     * @returns the entity found.
     */
    async findOne(id: number): Promise<Loaded<EquipmentItem>> {
        const equipmentItem: Loaded<EquipmentItem> | null =
            await this.em.findOne(EquipmentItem, {
                id,
            });

        if (!equipmentItem) {
            throw new NotFoundException('Equipment item specified not found.');
        }
        return equipmentItem;
    }

    /**
     * Updates a equipment item entity if found using dto. Raises
     * not found error if not found.
     *
     * @param id id of equipment item entity to find.
     * @param updateEquipmentItemDto dto used to update equipment item entity.
     * @returns the updated equipment item entity.
     */
    async update(
        id: number,
        updateEquipmentItemDto: UpdateEquipmentItemDto,
    ): Promise<Loaded<EquipmentItem>> {
        const equipmentItem: EquipmentItem = await this.findOne(id);
        equipmentItem.quantity =
            updateEquipmentItemDto.quantity ?? equipmentItem.quantity;
        if (updateEquipmentItemDto.gear_item_id !== undefined) {
            equipmentItem.gear_item = await this.gearItemService.findOne(
                updateEquipmentItemDto.gear_item_id,
            );
        }
        if (updateEquipmentItemDto.equipment_set_id !== undefined) {
            equipmentItem.equipment_set =
                await this.equipmentSetService.findOne(
                    updateEquipmentItemDto.equipment_set_id,
                );
        }
        const entityIsUnique: boolean = await this.isUnique(equipmentItem, false);
        if (entityIsUnique) {
            await this.em.persistAndFlush(equipmentItem);
        } else {
            throw new BadRequestException('Equipment item already exists.');
        }
        return equipmentItem;
    }

    /**
     * Removes an equipment item entity if found using id.
     * Raises not found error if not found.
     *
     * @param id id of equipment item entity to find.
     * @returns the entity eliminated.
     */
    async remove(id: number): Promise<Loaded<EquipmentItem>> {
        const equipmentItem: EquipmentItem = await this.findOne(id);
        await this.em.removeAndFlush(equipmentItem);

        return equipmentItem;
    }
}
