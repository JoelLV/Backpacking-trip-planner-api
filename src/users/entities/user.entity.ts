import {
    Entity,
    PrimaryKey,
    Property,
    OneToMany,
    Collection,
} from '@mikro-orm/core';
import { randomBytes } from 'crypto';
import { Trip } from 'src/trips/entities/trip.entity';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
@Entity()
export class User {
    @PrimaryKey({
        length: 64,
    })
    readonly id: string = uuid();

    @Property({
        length: 64,
    })
    readonly apiKey: string = randomBytes(32).toString('hex');

    @Property({
        length: 64,
    })
    name!: string;

    @OneToMany({ entity: () => Trip, mappedBy: (trip) => trip.user })
    trips: Collection<Trip> = new Collection<Trip>(this);

    constructor(createUserDto: CreateUserDto) {
        this.name = createUserDto.name;
    }
}
