import { IsString, Length, IsNotEmpty, Max, IsNumber } from 'class-validator';
export class CreateTrailDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 64)
    name!: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 32)
    difficulty!: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    location!: string;

    @IsNumber()
    @IsNotEmpty()
    @Max(99999.9)
    length!: number;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    description!: string;
}
