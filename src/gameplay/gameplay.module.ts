import { Module } from '@nestjs/common';
import { GameplayGateway } from './gameplay.gateway';
import { MatchmakingGateway } from './matchmaking/matchmaking.gateway';
import { GamingService } from './gaming/gaming.service';

@Module({
  providers: [GameplayGateway, MatchmakingGateway, GamingService],
})
export class GameplayModule {}
