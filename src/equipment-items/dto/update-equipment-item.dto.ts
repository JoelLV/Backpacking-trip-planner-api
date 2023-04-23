import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentItemDto } from './create-equipment-item.dto';
import { IsInt, Max, Min } from 'class-validator';

export class UpdateEquipmentItemDto extends PartialType(
    CreateEquipmentItemDto,
) {
    @IsInt()
    gear_item_id?: number;

    @IsInt()
    equipment_set_id?: number;

    @IsInt()
    @Max(10000)
    @Min(0)
    quantity?: number;
}
