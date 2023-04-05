import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentPackageDto } from './create-equipment-package.dto';

export class UpdateEquipmentPackageDto extends PartialType(CreateEquipmentPackageDto) {}
