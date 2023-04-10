import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTripDto {
    @IsInt()
    @IsNotEmpty()
    equipment_set_id!: number;

    @IsInt()
    @IsNotEmpty()
    trail_id!: number;

    @IsString()
    @IsNotEmpty()
    user_id!: string;

    @IsInt()
    @IsNotEmpty()
    lodging_id!: number;

    @IsInt()
    @IsNotEmpty()
    transportation_id!: number;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    planned_date!: Date;
}
