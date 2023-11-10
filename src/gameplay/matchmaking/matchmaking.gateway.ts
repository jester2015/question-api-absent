import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { GamingService } from '../gaming/gaming.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'Matchmaking' })
export class MatchmakingGateway {
  constructor(private gamingService: GamingService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) : string {
    return 'Hello world!';
  }

  @SubscribeMessage('join')
  joinMatchmaking(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    const joined = this.gamingService.join(client.id);

    if (joined.added) {
      return 'Matchmaking Started';
    }
    return 'Matchmaking Issue';
  }
  @SubscribeMessage('leave')
  leaveMatchmaking(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    const result = this.gamingService.leave(client.id);

    if (result.added) {
      return 'Matchmaking Ended';
    }
    return 'Matchmaking Issue';
  }

  @SubscribeMessage('getCurrentList')
  listMatchmaking(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    return this.gamingService.matchMaking;
  }

  
}
