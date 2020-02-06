import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { Client, Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(client: Client, data: any): Observable<WsResponse<number>> {
    // tslint:disable-next-line:no-console
    console.log(data);
    client.server.emit('strange_event', {
      data: 3,
    });
    // tslint:disable-next-line:no-console
    console.log('bera submit nje strange event');
    return from([11, 22, 32]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(client: Client, data: number): Promise<number> {
    // tslint:disable-next-line:no-console
    console.log('ndodhi nje event identity ne server:', data);
    return data;
  }
}
