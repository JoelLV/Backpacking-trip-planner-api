import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateEquipmentItemDto {
    @IsNotEmpty()
    @IsInt()
    gear_item_id!: number;

    @IsNotEmpty()
    @IsInt()
    equipment_set_id!: number;

    @IsNotEmpty()
    @IsInt()
    @Max(10000)
    @Min(0)
    quantity!: number;
}
