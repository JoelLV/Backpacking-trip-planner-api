import { PartialType } from '@nestjs/mapped-types';
import { CreateLodgingDto } from './create-lodging.dto';
import { IsInt, IsNumber, IsString, Length, Max } from 'class-validator';
export class UpdateLodgingDto extends PartialType(CreateLodgingDto) {
    @IsNumber()
    @Max(99999999.99)
    cost?: number;

    @IsString()
    @Length(1, 64)
    name?: string;

    @IsString()
    @Length(1, 255)
    description?: string;

    @IsString()
    @Length(1, 124)
    address?: string;

    @IsString()
    @Length(1, 24)
    phone?: string;

    @IsString()
    @Length(1, 124)
    email?: string;

    @IsInt()
    rating?: number;

    constructor() {
        super();
    }
}
