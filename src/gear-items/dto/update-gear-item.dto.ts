import { PartialType } from '@nestjs/mapped-types';
import { CreateGearItemDto } from './create-gear-item.dto';
import { IsString, Length, IsBoolean } from 'class-validator';

export class UpdateGearItemDto extends PartialType(CreateGearItemDto) {
    @IsString()
    @Length(1, 64)
    name?: string;

    @IsBoolean()
    is_consumable?: boolean;
}
