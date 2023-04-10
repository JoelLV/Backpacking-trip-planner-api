import {
    Entity,
    PrimaryKey,
    ManyToOne,
    Unique,
    Property,
} from '@mikro-orm/core';
import { EquipmentSet } from 'src/equipment-sets/entities/equipment-set.entity';
import { Lodging } from 'src/lodgings/entities/lodging.entity';
import { Trail } from 'src/trails/entities/trail.entity';
import { Transportation } from 'src/transportations/entities/transportation.entity';
import { User } from 'src/users/entities/user.entity';
@Entity()
@Unique({ properties: ['equipment_set', 'trail', 'user', 'lodging'] })
export class Trip {
    @PrimaryKey({
        autoincrement: true,
    })
    readonly id!: number;

    @ManyToOne({ entity: () => EquipmentSet, fieldName: 'equipment_set_id' })
    equipment_set!: EquipmentSet;

    @ManyToOne({ entity: () => Trail, fieldName: 'trail_id' })
    trail!: Trail;

    @ManyToOne({ entity: () => User, fieldName: 'user_id' })
    user!: User;

    @ManyToOne({ entity: () => Lodging, fieldName: 'lodging_id' })
    lodging!: Lodging;

    @ManyToOne({ entity: () => Transportation, fieldName: 'transporation_id' })
    transporation!: Transportation;

    @Property()
    planned_date!: Date;
}
