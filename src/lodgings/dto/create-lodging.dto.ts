import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Max,
} from 'class-validator';
export class CreateLodgingDto {
    @IsNotEmpty()
    @IsNumber()
    @Max(99999999.99)
    cost!: number;

    @IsNotEmpty()
    @IsString()
    @Length(1, 64)
    name!: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    description!: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 124)
    address!: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 24)
    phone!: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 124)
    email!: string;

    @IsNotEmpty()
    @IsInt()
    rating!: number;
}
