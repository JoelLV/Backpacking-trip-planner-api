import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
} from '@mikro-orm/core';
import { Trip } from 'src/trips/entities/trip.entity';
import { CreateTrailDto } from '../dto/create-trail.dto';
@Entity()
export class Trail {
    @PrimaryKey({
        autoincrement: true,
    })
    readonly id!: number;

    @Property({
        length: 64,
    })
    name!: string;

    @Property({
        length: 32,
    })
    difficulty!: string;

    @Property({
        length: 255,
    })
    location!: string;

    @Property({
        type: 'double(5,1)',
    })
    length!: number;

    @Property({
        length: 255,
    })
    description!: string;

    @OneToMany({ entity: () => Trip, mappedBy: (trip) => trip.trail })
    trips: Collection<Trip> = new Collection<Trip>(this);

    constructor(createTrailDto: CreateTrailDto) {
        this.name = createTrailDto.name;
        this.difficulty = createTrailDto.difficulty;
        this.location = createTrailDto.location;
        this.length = createTrailDto.length;
        this.description = createTrailDto.description;
    }
}
