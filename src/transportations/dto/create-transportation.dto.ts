import { IsNumber, Max, IsNotEmpty, Length, IsString } from 'class-validator';

export class CreateTransportationDto {
    @Max(99999999.99)
    @IsNumber()
    @IsNotEmpty()
    cost!: number;

    @IsString()
    @IsNotEmpty()
    @Length(1, 64)
    name!: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 124)
    address!: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    description!: string;
}
