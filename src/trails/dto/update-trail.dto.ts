import { PartialType } from '@nestjs/mapped-types';
import { CreateTrailDto } from './create-trail.dto';
import { IsString, Length, Max, IsNumber } from 'class-validator';

export class UpdateTrailDto extends PartialType(CreateTrailDto) {
    @IsString()
    @Length(1, 64)
    name?: string;

    @IsString()
    @Length(1, 32)
    difficulty?: string;

    @IsString()
    @Length(1, 255)
    location?: string;

    @IsNumber()
    @Max(99999.9)
    length?: number;

    @IsString()
    @Length(1, 255)
    description?: string;

    constructor() {
        super();
    }
}
