import { IsNotEmpty } from 'class-validator';

export class StartDeliveryDto {

    @IsNotEmpty()
    readonly user_id: number;

    @IsNotEmpty()
    readonly invoices: string[];
}
