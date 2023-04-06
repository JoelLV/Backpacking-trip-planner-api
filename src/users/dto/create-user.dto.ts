import { IsString, Length, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @Length(1, 64)
    @IsNotEmpty()
    name!: string;
}
