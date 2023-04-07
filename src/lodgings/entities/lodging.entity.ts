import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
} from '@mikro-orm/core';
import { Trip } from 'src/trips/entities/trip.entity';
import { CreateLodgingDto } from '../dto/create-lodging.dto';
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

    constructor(createLodgingDto: CreateLodgingDto) {
        this.cost = createLodgingDto.cost;
        this.name = createLodgingDto.name;
        this.description = createLodgingDto.description;
        this.address = createLodgingDto.address;
        this.phone = createLodgingDto.phone;
        this.email = createLodgingDto.email;
        this.rating = createLodgingDto.rating;
    }
}
