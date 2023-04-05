import { Module } from '@nestjs/common';
import { EquipmentItemsService } from './equipment-items.service';
import { EquipmentItemsController } from './equipment-items.controller';

@Module({
    controllers: [EquipmentItemsController],
    providers: [EquipmentItemsService],
})
export class EquipmentItemsModule {}
