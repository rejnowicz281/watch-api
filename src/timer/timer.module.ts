import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimerController } from './timer.controller';
import { Timer, TimerSchema } from './timer.schema';
import { TimerService } from './timer.service';

@Module({
  providers: [TimerService],
  controllers: [TimerController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Timer.name,
        schema: TimerSchema,
      },
    ]),
  ],
})
export class TimerModule {}
