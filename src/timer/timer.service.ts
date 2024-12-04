import { Injectable } from '@nestjs/common';
import { Timer } from 'src/lib/types/timer';
import { CreateTimerDto } from './dto/create-timer-dto';
import { UpdateTimerDto } from './dto/update-timer-dto';

@Injectable()
export class TimerService {
  private readonly timers: Timer[] = [
    {
      id: '1',
      length: 10,
      name: 'sampleTimer1',
    },
    {
      id: '2',
      length: 20,
      name: 'sampleTimer2',
    },
  ];

  async findAll(): Promise<Timer[]> {
    return this.timers;
  }

  async findOne(id: string): Promise<Timer | undefined> {
    return this.timers.find((timer) => timer.id === id);
  }

  async create(dto: CreateTimerDto): Promise<Timer> {
    const newTimer = { id: (this.timers.length + 1).toString(), ...dto };

    this.timers.push(newTimer);

    return newTimer;
  }

  async update(dto: UpdateTimerDto): Promise<Timer | undefined> {
    const index = this.timers.findIndex((w) => w.id === dto.id);

    if (index === -1) return undefined;

    this.timers[index] = { ...this.timers[index], ...dto };

    return this.timers[index];
  }

  async delete(id: string): Promise<Timer | undefined> {
    const index = this.timers.findIndex((timer) => timer.id === id);

    if (index === -1) return undefined;

    const [timer] = this.timers.splice(index, 1);
    return timer;
  }
}
