import { PartialType } from '@nestjs/mapped-types';
import { CreateTripDto } from './create-trip.dto';
import { IsInt } from 'class-validator';

export class UpdateTripDto extends PartialType(CreateTripDto) {
    @IsInt()
    equipment_set_id?: number;

    @IsInt()
    trail_id?: number;

    @IsInt()
    user_id?: number;

    @IsInt()
    lodging_id?: number;

    @IsInt()
    transportation_id?: number;
}
