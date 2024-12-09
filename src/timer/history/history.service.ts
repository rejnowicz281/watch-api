import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEntryDto } from './dto/create-entry-dto';
import { HistoryEntry } from './history-entry.schema';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(HistoryEntry.name) private historyModel: Model<HistoryEntry>,
  ) {}

  async findAll(timerId: string, currentUserId: string) {
    return this.historyModel
      .find({
        timer: timerId === 'infinite' ? undefined : timerId,
        user: currentUserId,
      })
      .exec();
  }

  async createEntry(dto: CreateEntryDto, currentUserId: string) {
    return this.historyModel.create({
      ...dto,
      user: currentUserId,
    });
  }

  async deleteEntry(id: string, currentUserId: string) {
    return this.historyModel.findOneAndDelete({
      _id: id,
      user: currentUserId,
    });
  }
}
