import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryService } from './delivery.service';
import { DeliveriesController } from './deliveries.controller';
import { Delivery } from './delivery.entity';
import { Sale } from './sale.entity';
import { EventsGateway } from '../events/events.gateways';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery, Sale])],
  providers: [DeliveryService, EventsGateway],
  controllers: [DeliveriesController],
})
export class DeliveryModule { }
