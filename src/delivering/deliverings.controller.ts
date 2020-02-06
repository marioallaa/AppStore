import { Controller, Body, Put, Res, Param, HttpStatus, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivering } from './delivering.entity';
import { DeliveringService } from './delivering.service';
import { DeliveryService } from '../delivery/delivery.service';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { DeliveringDto } from './dto';
import { Response } from 'express';

@Controller('deliverings')
export class DeliveringsController {

  @InjectRepository(Delivering)
  public deliveringRepository: any;

  constructor(
    private deliveringService: DeliveringService,
    private deliveryService: DeliveryService,
  ) { }

  @UsePipes(new ValidationPipe())
  @Put('/:uuid')
  async updateCoordinates(@Body() deliveringData: DeliveringDto, @Param('uuid') uuid: any, @Res() res: Response) {
    const delivery = await this.deliveryService.findByUuid(uuid);

    if (!delivery) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: 1,
        message: `Delivery with UUID ${uuid} does not exist in our datastore!`,
        data: [],
      });
    }
    const data = { uuid, ...deliveringData };
    await this.deliveringService.create(data);
    res.status(HttpStatus.OK).json({
      status: 0,
      message: 'Delivery updated!' ,
      data: [],
    });
  }
}
