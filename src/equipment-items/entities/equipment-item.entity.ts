import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { EquipmentSet } from 'src/equipment-sets/entities/equipment-set.entity';
import { GearItem } from 'src/gear-items/entities/gear-item.entity';

@Entity()
export class EquipmentItem {
    @PrimaryKey({
        autoincrement: true,
    })
    readonly id!: number;

    @ManyToOne({ entity: () => GearItem, fieldName: 'gear_item_id' })
    gear_item!: GearItem;

    @ManyToOne({ entity: () => EquipmentSet, fieldName: 'equipment_set_id' })
    equipment_set!: EquipmentSet;

    @Property()
    quantity!: number;
}
