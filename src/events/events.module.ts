import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateways';

@Module({
  providers: [EventsGateway],
})
export class EventsModule {}
