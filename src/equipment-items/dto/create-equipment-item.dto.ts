import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateEquipmentItemDto {
    @IsNotEmpty()
    @IsInt()
    gear_item_id!: number;

    @IsNotEmpty()
    @IsInt()
    equipment_set_id!: number;

    @IsNotEmpty()
    @IsInt()
    quantity!: number;
}
