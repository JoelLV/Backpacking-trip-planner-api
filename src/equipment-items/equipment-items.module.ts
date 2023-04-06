import { Module } from '@nestjs/common';
import { EquipmentItemsService } from './equipment-items.service';
import { EquipmentItemsController } from './equipment-items.controller';
import { EquipmentSetsService } from 'src/equipment-sets/equipment-sets.service';
import { GearItemsService } from 'src/gear-items/gear-items.service';

@Module({
    controllers: [EquipmentItemsController],
    providers: [EquipmentItemsService, EquipmentSetsService, GearItemsService],
})
export class EquipmentItemsModule {}
