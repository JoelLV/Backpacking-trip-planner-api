import { Module } from '@nestjs/common';
import { EquipmentSetsService } from './equipment-sets.service';
import { EquipmentSetsController } from './equipment-sets.controller';

@Module({
    controllers: [EquipmentSetsController],
    providers: [EquipmentSetsService],
})
export class EquipmentSetsModule {}
