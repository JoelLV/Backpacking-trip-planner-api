import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentItemDto } from './create-equipment-item.dto';
import { IsInt } from 'class-validator';

export class UpdateEquipmentItemDto extends PartialType(
    CreateEquipmentItemDto,
) {
    @IsInt()
    gear_item_id?: number;

    @IsInt()
    equipment_set_id?: number;

    @IsInt()
    quantity?: number;
}
