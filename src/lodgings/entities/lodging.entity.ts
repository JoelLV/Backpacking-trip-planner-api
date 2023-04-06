import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
} from '@mikro-orm/core';
import { Trip } from 'src/trips/entities/trip.entity';
@Entity()
export class Lodging {
    @PrimaryKey({
        autoincrement: true,
    })
    readonly id!: number;

    @Property({
        type: 'double(8,2)',
    })
    cost!: number;

    @Property({
        length: 64,
    })
    name!: string;

    @Property({
        length: 255,
    })
    description!: string;

    @Property({
        length: 124,
    })
    address!: string;

    @Property({
        length: 24,
    })
    phone!: string;

    @Property({
        length: 124,
    })
    email!: string;

    @Property()
    rating!: number;

    @OneToMany({ entity: () => Trip, mappedBy: (trip) => trip.lodging })
    trips: Collection<Trip> = new Collection<Trip>(this);
}
