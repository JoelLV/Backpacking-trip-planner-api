import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @Length(1, 64)
    @IsString()
    name?: string;
}
