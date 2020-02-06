import { IsNotEmpty, IsString, IsEmpty } from 'class-validator';
import { isString } from 'util';

export class DeliveringDto {
    @IsEmpty()
    readonly uuid: string;

    @IsNotEmpty()
    readonly latitude: number;

    @IsNotEmpty()
    readonly longitude: number;
}
