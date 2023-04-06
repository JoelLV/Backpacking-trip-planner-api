import { Module } from '@nestjs/common';
import { GearItemsService } from './gear-items.service';
import { GearItemsController } from './gear-items.controller';

@Module({
    controllers: [GearItemsController],
    providers: [GearItemsService],
})
export class GearItemsModule {}
