import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, In } from 'typeorm';
import { Delivering } from './delivering.entity';
import { EventsGateway } from '../events/events.gateways';
import { DeliveringDto } from './dto';
import { format } from 'date-fns';
import { Delivery } from '../delivery/delivery.entity';
import { Sale } from '../delivery/sale.entity';

@Injectable()
export class DeliveringService {
  constructor(
    @InjectRepository(Delivering)
    private readonly deliveringRepository: Repository<Delivering>,

    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,

    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,

    private eventsGateway: EventsGateway,
  ) { }

  findAll(): Promise<Delivering[]> {
    return this.deliveringRepository.find();
  }

  async create(data: DeliveringDto): Promise<Delivering> {
    const currentTimestamp = format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    const delivering = new Delivering();
    delivering.uuid = data.uuid;
    delivering.latitude = data.latitude;
    delivering.longitude = data.longitude;
    delivering.createdAt = currentTimestamp;
    delivering.updatedAt = currentTimestamp;

    const result = await this.deliveringRepository.save(delivering);
    const delivery = await this.deliveryRepository.find({ where: { deliveringUuid: data.uuid } });
    const invoices: number[] = [];
    const orders: number[] = [];

    delivery.forEach(deliveryInvoice => {
      invoices.push(deliveryInvoice.invoiceId);
    });

    const sales = await this.saleRepository.find({ where: { id: In(invoices) } });
    sales.forEach(sale => {
      orders.push(sale.orderId);
    });
    this.eventsGateway.server.emit('delivery_updated', JSON.stringify({
        uuid: data.uuid,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        invoices,
        orders,
    }));

    return result;
  }

  async update(id: number, data: DeliveringDto): Promise<UpdateResult> {
    const result = await this.deliveringRepository.update({ id }, data);
    this.eventsGateway.server.emit('delivery_updated', JSON.stringify({
      uuid: data.uuid,
      latitude: data.latitude,
      longitude: data.longitude,
    }));

    return result;
  }
}
