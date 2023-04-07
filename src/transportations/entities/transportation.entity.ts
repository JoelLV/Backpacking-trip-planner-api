import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
} from '@mikro-orm/core';
import { Trip } from 'src/trips/entities/trip.entity';
import { CreateTransportationDto } from '../dto/create-transportation.dto';
@Entity()
export class Transportation {
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
        length: 124,
    })
    address!: string;

    @Property({
        length: 255,
    })
    description!: string;

    @OneToMany({ entity: () => Trip, mappedBy: (trip) => trip.transporation })
    trips: Collection<Trip> = new Collection<Trip>(this);

    constructor(createDto: CreateTransportationDto) {
        this.cost = createDto.cost;
        this.name = createDto.name;
        this.address = createDto.address;
        this.description = createDto.description;
    }
}
