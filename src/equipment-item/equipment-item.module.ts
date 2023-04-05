import { Module } from '@nestjs/common';
import { EquipmentItemService } from './equipment-item.service';
import { EquipmentItemController } from './equipment-item.controller';

@Module({
    controllers: [EquipmentItemController],
    providers: [EquipmentItemService],
})
export class EquipmentItemModule {}
