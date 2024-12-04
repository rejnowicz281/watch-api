import { Module } from '@nestjs/common';
import { TimerController } from './timer.controller';
import { TimerService } from './timer.service';

@Module({
  providers: [TimerService],
  controllers: [TimerController],
})
export class TimerModule {}
