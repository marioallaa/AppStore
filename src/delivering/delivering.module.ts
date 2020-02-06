import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveringService } from './delivering.service';
import { DeliveringsController } from './deliverings.controller';
import { Delivering } from './delivering.entity';
import { EventsGateway } from '../events/events.gateways';
import { DeliveryService } from '../delivery/delivery.service';
import { Delivery } from '../delivery/delivery.entity';
import { DeliveryModule } from '../delivery/delivery.module';
import { Sale } from '../delivery/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Delivering, Sale, Delivery]), DeliveryModule],
  providers: [DeliveringService, EventsGateway, DeliveryService],
  controllers: [DeliveringsController],
})
export class DeliveringModule { }
