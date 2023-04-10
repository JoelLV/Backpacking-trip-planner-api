import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trip.dto';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class UpdateTripDto extends PartialType(CreateTripDto) {
    @IsInt()
    equipment_set_id?: number;

    @IsInt()
    trail_id?: number;

    @IsString()
    user_id?: string;

    @IsInt()
    lodging_id?: number;

    @IsInt()
    transportation_id?: number;

    @IsDate()
    @Type(() => Date)
    planned_date?: Date;
}
