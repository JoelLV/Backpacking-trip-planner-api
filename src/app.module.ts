import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';
import { LodgingsModule } from './lodgings/lodgings.module';
import { TrailsModule } from './trails/trails.module';
import { TransportationsModule } from './transportations/transportations.module';
import { EquipmentSetsModule } from './equipment-sets/equipment-sets.module';
import { EquipmentItemsModule } from './equipment-items/equipment-items.module';
import { EquipmentItemModule } from './equipment-item/equipment-item.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
    imports: [
        MikroOrmModule.forRoot(),
        LodgingsModule,
        UsersModule,
        TrailsModule,
        TripsModule,
        TransportationsModule,
        EquipmentSetsModule,
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
