import { Module } from '@nestjs/common';
import { EquipmentPackageService } from './equipment-package.service';
import { EquipmentPackageController } from './equipment-package.controller';

@Module({
  controllers: [EquipmentPackageController],
  providers: [EquipmentPackageService]
})
export class EquipmentPackageModule {}
