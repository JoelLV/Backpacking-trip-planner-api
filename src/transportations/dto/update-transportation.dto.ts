import { PartialType } from '@nestjs/mapped-types';
import { CreateTransportationDto } from './create-transportation.dto';
import { Max, IsNumber, IsString, Length } from 'class-validator';
export class UpdateTransportationDto extends PartialType(
    CreateTransportationDto,
) {
    @Max(99999999.99)
    @IsNumber()
    cost?: number;

    @IsString()
    @Length(1, 124)
    name?: string;

    @IsString()
    @Length(1, 124)
    address?: string;

    @IsString()
    @Length(1, 255)
    description?: string;
}
