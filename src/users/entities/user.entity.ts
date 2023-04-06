import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
} from '@mikro-orm/core';
import { randomBytes } from 'crypto';
import { Trip } from 'src/trips/entities/trip.entity';
import { uuid } from 'uuidv4';
@Entity()
export class User {
    @PrimaryKey({
        length: 64,
    })
    readonly id: string = uuid();

    @Property({
        length: 64,
    })
    readonly apiKey: string = randomBytes(64).toString();

    @Property({
        length: 64,
    })
    name!: string;

    @OneToMany({ entity: () => Trip, mappedBy: (trip) => trip.user })
    trips: Collection<Trip> = new Collection<Trip>(this);
}
