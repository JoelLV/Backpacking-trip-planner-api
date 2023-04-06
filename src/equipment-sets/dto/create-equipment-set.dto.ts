import { IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateEquipmentSetDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 64)
    name!: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    description!: string;
}
