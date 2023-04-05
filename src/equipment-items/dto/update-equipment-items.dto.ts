import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentItemsDto } from './create-equipment-items.dto';

export class UpdateEquipmentItemsDto extends PartialType(CreateEquipmentItemsDto) {}
