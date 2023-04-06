import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
} from '@mikro-orm/core';
import { EquipmentItem } from 'src/equipment-items/entities/equipment-item.entity';
import { Trip } from 'src/trips/entities/trip.entity';
@Entity()
export class EquipmentSet {
    @PrimaryKey({
        autoincrement: true,
    })
    readonly id!: number;

    @Property({
        length: 64,
    })
    name!: string;

    @Property({
        length: 255,
    })
    description!: string;

    @OneToMany({
        entity: () => EquipmentItem,
        mappedBy: (equipment_item) => equipment_item.equipment_set,
    })
    equipment_items: Collection<EquipmentItem> = new Collection<EquipmentItem>(
        this,
    );

    @OneToMany({ entity: () => Trip, mappedBy: (trip) => trip.equipment_set })
    trips: Collection<Trip> = new Collection<Trip>(this);
}
