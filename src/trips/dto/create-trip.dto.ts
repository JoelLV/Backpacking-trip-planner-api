import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTripDto {
    @IsInt()
    @IsNotEmpty()
    equipment_set_id!: number;

    @IsInt()
    @IsNotEmpty()
    trail_id!: number;

    @IsInt()
    @IsNotEmpty()
    user_id!: number;

    @IsInt()
    @IsNotEmpty()
    lodging_id!: number;

    @IsInt()
    @IsNotEmpty()
    transportation_id!: number;
}
