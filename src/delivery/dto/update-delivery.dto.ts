import { IsNotEmpty } from 'class-validator';

export class UpdateDeliveryDto {

    @IsNotEmpty()
    readonly deliveringUuid: string;

    @IsNotEmpty()
    readonly statusId: number;

    @IsNotEmpty()
    readonly updatedAt: string;

    @IsNotEmpty()
    readonly deliveryUserId: number;
    readonly invoiceId: number;
}
