import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
} from '@mikro-orm/core';
import { EquipmentItem } from 'src/equipment-items/entities/equipment-item.entity';
import { CreateGearItemDto } from '../dto/create-gear-item.dto';

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

    constructor(createGearItemDto: CreateGearItemDto) {
        this.name = createGearItemDto.name
        this.is_consumable = createGearItemDto.is_consumable
    }
}
