import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreateTimerDto } from './dto/create-timer-dto';
import { UpdateTimerDto } from './dto/update-timer-dto';
import { TimerService } from './timer.service';

@UseGuards(AccessTokenGuard)
@Controller('timers')
export class TimerController {
  constructor(private readonly timerService: TimerService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getTimers(@Request() req) {
    return this.timerService.findAll(req.user._id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTimer(@Param('id') id: string, @Request() req) {
    return this.timerService.findOne(id, req.user._id);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async createTimer(@Body() createTimerDto: CreateTimerDto, @Request() req) {
    return this.timerService.create(createTimerDto, req.user._id);
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  async updateTimer(@Body() updateTimerDto: UpdateTimerDto, @Request() req) {
    return this.timerService.update(updateTimerDto, req.user._id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteTimer(@Param('id') id: string, @Request() req) {
    return this.timerService.delete(id, req.user._id);
  }
}
