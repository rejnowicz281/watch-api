import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreateEntryDto } from './dto/create-entry-dto';
import { HistoryService } from './history.service';

@UseGuards(AccessTokenGuard)
@Controller('timer-history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':timerId')
  async getHistory(@Request() req, @Param('timerId') timerId: string) {
    return this.historyService.findAll(timerId, req.user._id);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async createEntry(@Body() createEntryDto: CreateEntryDto, @Request() req) {
    return this.historyService.createEntry(createEntryDto, req.user._id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteEntry(@Request() req, @Param('id') id: string) {
    return this.historyService.deleteEntry(id, req.user._id);
  }
}
