import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentSetDto } from './create-equipment-set.dto';
import { IsString, Length } from 'class-validator';

export class UpdateEquipmentSetDto extends PartialType(CreateEquipmentSetDto) {
    @IsString()
    @Length(1, 64)
    name?: string;

    @IsString()
    @Length(1, 255)
    description?: string;

    constructor() {
        super();
    }
}
