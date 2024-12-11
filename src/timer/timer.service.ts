import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTimerDto } from './dto/create-timer-dto';
import { UpdateTimerDto } from './dto/update-timer-dto';
import { Timer } from './timer.schema';

@Injectable()
export class TimerService {
  constructor(@InjectModel(Timer.name) private timerModel: Model<Timer>) {}

  async findAll(currentUserId: string) {
    return this.timerModel.find({ user: currentUserId }).exec();
  }

  async findOne(id: string, currentUserId: string) {
    return this.timerModel
      .find({
        _id: id,
        user: currentUserId,
      })
      .exec();
  }

  async create(dto: CreateTimerDto, currentUserId: string) {
    return this.timerModel.create({ ...dto, user: currentUserId });
  }

  async update(dto: UpdateTimerDto, currentUserId: string) {
    return this.timerModel.findOneAndUpdate(
      { _id: dto._id, user: currentUserId },
      { ...dto, user: currentUserId },
      { new: true },
    );
  }

  async delete(id: string, currentUserId: string) {
    return this.timerModel.findOneAndDelete({ _id: id, user: currentUserId });
  }
}
