import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { LodgingsService } from 'src/lodgings/lodgings.service';
import { TransportationsService } from 'src/transportations/transportations.service';
import { UsersService } from 'src/users/users.service';
import { TrailsService } from 'src/trails/trails.service';
import { EquipmentSetsService } from 'src/equipment-sets/equipment-sets.service';

@Module({
    controllers: [TripsController],
    providers: [TripsService, LodgingsService, TransportationsService, UsersService, TrailsService, EquipmentSetsService],
})
export class TripsModule {}
