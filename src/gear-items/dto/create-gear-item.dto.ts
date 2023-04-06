import { IsNotEmpty, IsString, Length, IsBoolean } from 'class-validator';
export class CreateGearItemDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 64)
    name!: string;

    @IsNotEmpty()
    @IsBoolean()
    is_consumable!: boolean;
}
