import {
    Entity,
    ManyToOne,
    PrimaryKey,
    Property,
    Unique,
} from '@mikro-orm/core';
import { EquipmentSet } from 'src/equipment-sets/entities/equipment-set.entity';
import { GearItem } from 'src/gear-items/entities/gear-item.entity';
import { CreateEquipmentItemDto } from '../dto/create-equipment-item.dto';

@Entity()
@Unique({ properties: ['gear_item', 'equipment_set'] })
export class EquipmentItem {
    @PrimaryKey({
        autoincrement: true,
    })
    readonly id!: number;

    @ManyToOne({
        entity: () => GearItem,
        fieldName: 'gear_item_id',
        onDelete: 'cascade',
    })
    gear_item!: GearItem;

    @ManyToOne({
        entity: () => EquipmentSet,
        fieldName: 'equipment_set_id',
        onDelete: 'cascade',
    })
    equipment_set!: EquipmentSet;

    @Property()
    quantity!: number;

    constructor(createEquipmentItemDto: CreateEquipmentItemDto) {
        this.quantity = createEquipmentItemDto.quantity;
    }
}
