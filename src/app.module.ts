import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { GameplayModule } from './gameplay/gameplay.module';

@Module({
  imports: [EventsModule, GameplayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
