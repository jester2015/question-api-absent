import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'events' })
export class EventsGateway {
  @WebSocketServer()
  socket: Server;
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  sendMessage() {
    this.socket.emit('newMessage', 'hello world from the server');
  }
}
