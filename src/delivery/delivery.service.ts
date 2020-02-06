import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Delivery } from './delivery.entity';
import { EventsGateway } from '../events/events.gateways';
import { UpdateDeliveryDto } from './dto';
import { Sale } from './sale.entity';
import statuses from '../helpers/statuses';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,

    private eventsGateway: EventsGateway,
  ) { }

  findAll(): Promise<Delivery[]> {
    return this.deliveryRepository.find();
  }

  findBy(whereCondition): Promise<Delivery[]> {
    return this.deliveryRepository.find(whereCondition);
  }

  async findByUuid(uuid: string): Promise<Delivery> {
    return await this.deliveryRepository.findOne({ where: { deliveringUuid: uuid } });
  }

  async update(id: number, data: UpdateDeliveryDto): Promise<UpdateResult> {
    const result = await this.deliveryRepository.update({ id }, data);
    if (! result) {
      return null;
    }
    await this.saleRepository.update({
      id: data.invoiceId,
    }, {
      deliveryStatusId: statuses.DISPATCHED,
    });
    this.eventsGateway.server.emit('delivery_started', JSON.stringify({
      user_id: data.deliveryUserId,
      delivering_uuid: data.deliveringUuid,
    }));

    return result;
  }
}
