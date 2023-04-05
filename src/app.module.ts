import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LodgingModule } from './lodging/lodging.module';
import { UserModule } from './user/user.module';
import { TrailModule } from './trail/trail.module';
import { TripModule } from './trip/trip.module';
import { TransportationModule } from './transportation/transportation.module';
import { EquipmentSetModule } from './equipment-set/equipment-set.module';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';
import { LodgingsModule } from './lodgings/lodgings.module';
import { TrailsModule } from './trails/trails.module';
import { TransportationsModule } from './transportations/transportations.module';
import { EquipmentSetsModule } from './equipment-sets/equipment-sets.module';
import { EquipmentItemsModule } from './equipment-items/equipment-items.module';
import { EquipmentItemModule } from './equipment-item/equipment-item.module';

@Module({
    imports: [
        LodgingModule,
        UserModule,
        TrailModule,
        TripModule,
        TransportationModule,
        EquipmentSetModule,
        UsersModule,
        TripsModule,
        LodgingsModule,
        TrailsModule,
        TransportationsModule,
        EquipmentSetsModule,
        EquipmentItemsModule,
        EquipmentItemModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
