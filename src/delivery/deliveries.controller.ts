import { Controller, Body, Post, Res, Param, HttpStatus, UsePipes } from '@nestjs/common';
import { Delivery } from './delivery.entity';
import { DeliveryService } from './delivery.service';
import { In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { StartDeliveryDto } from './dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { format } from 'date-fns';
import statuses from '../helpers/statuses';

@Controller('deliveries')
export class DeliveriesController {

  @InjectRepository(Delivery)
  public deliveryRepository: any;

  constructor(
    private deliveryService: DeliveryService,
  ) { }

  @UsePipes(new ValidationPipe())
  @Post('/:uuid/start')
  async startDelivery(@Body() deliveryData: StartDeliveryDto, @Param('uuid') uuid: any, @Res() res: Response) {
    const existingDelivery = await this.deliveryService.findByUuid(uuid);

    if (existingDelivery) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: 1,
        message: `Delivery with UUID ${uuid} exist in our datastore!`,
        data: [],
      });
    }

    if (!deliveryData.invoices || !deliveryData.invoices.length) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: 3,
        message: `Select some invoices!`,
        data: [],
      });
    }
    const userId = deliveryData.user_id;
    const deliveries = await this.deliveryService.findBy({
      where: { deliveryUserId: userId, statusId: statuses.WAITING_DELIVERY, invoiceId: In(deliveryData.invoices) },
    });

    if (!deliveries || deliveries.length === 0) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: 2,
        message: `Delivery for this invoices already exist in our datastore!`,
        data: [],
      });
    }

    const currentTimestamp = format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    await deliveries.forEach((delivery: any) => {
      this.deliveryService.update(delivery.id, {
        deliveringUuid: uuid,
        statusId: statuses.DISPATCHED,
        updatedAt: currentTimestamp,
        deliveryUserId: userId,
        invoiceId: delivery.invoiceId,
      });

    });

    res.status(HttpStatus.OK).json({
      status: 0,
      message: 'Delivery started!',
      data: [],
    });
  }
}
