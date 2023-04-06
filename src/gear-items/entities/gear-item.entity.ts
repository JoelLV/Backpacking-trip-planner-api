import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
} from '@mikro-orm/core';
import { EquipmentItem } from 'src/equipment-items/entities/equipment-item.entity';

@Entity()
export class GearItem {
    @PrimaryKey({
        autoincrement: true,
    })
    readonly id!: number;

    @Property({
        length: 64,
    })
    name!: string;

    @Property()
    is_consumable!: boolean;

    @OneToMany({
        entity: () => EquipmentItem,
        mappedBy: (equipment_item) => equipment_item.gear_item,
    })
    equipment_items: Collection<EquipmentItem> = new Collection<EquipmentItem>(
        this,
    );
}
