import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTimerDto } from './dto/create-timer-dto';
import { UpdateTimerDto } from './dto/update-timer-dto';
import { TimerService } from './timer.service';

@Controller('timers')
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getTimers() {
    return this.timerService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTimer(@Param('id') id: string) {
    return this.timerService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('timer')
  async createTimer(@Body() createTimerDto: CreateTimerDto) {
    return this.timerService.create(createTimerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('timer')
  async updateTimer(@Body() updateTimerDto: UpdateTimerDto) {
    return this.timerService.update(updateTimerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('timer/:id')
  async deleteTimer(@Param('id') id: string) {
    return this.timerService.delete(id);
  }
}
