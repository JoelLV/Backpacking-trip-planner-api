import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';
import { LodgingsModule } from './lodgings/lodgings.module';
import { TrailsModule } from './trails/trails.module';
import { TransportationsModule } from './transportations/transportations.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EquipmentItemModule } from './equipment-item/equipment-item.module';
import { EquipmentSetsModule } from './equipment-sets/equipment-sets.module';
import { EquipmentItemsModule } from './equipment-items/equipment-items.module';

@Module({
    imports: [
        MikroOrmModule.forRoot(),
        UsersModule,
        TripsModule,
        LodgingsModule,
        TrailsModule,
        TransportationsModule,
        EquipmentItemModule,
        EquipmentSetsModule,
        EquipmentItemsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
