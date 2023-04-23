import { IsNotEmpty, IsString } from 'class-validator';

export class StringIdRequestParam {
    @IsString()
    @IsNotEmpty()
    id: string;
}
