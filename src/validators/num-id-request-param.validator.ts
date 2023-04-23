import { IsNotEmpty, IsNumberString } from 'class-validator';

export class NumIdRequestParam {
    @IsNotEmpty()
    @IsNumberString()
    id: number;
}
