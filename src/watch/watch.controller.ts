import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateWatchDto } from './dto/create-watch-dto';
import { UpdateWatchDto } from './dto/update-watch-dto';
import { WatchService } from './watch.service';

@Controller('watches')
export class WatchController {
  constructor(private readonly watchService: WatchService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getWatches() {
    return this.watchService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('watch/:id')
  async getWatch(@Param('id') id: string) {
    return this.watchService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('watch')
  async createWatch(@Body() createWatchDto: CreateWatchDto) {
    return this.watchService.create(createWatchDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('watch')
  async updateWatch(@Body() updateWatchDto: UpdateWatchDto) {
    return this.watchService.update(updateWatchDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('watch/:id')
  async deleteWatch(@Param('id') id: string) {
    return this.watchService.delete(id);
  }
}
