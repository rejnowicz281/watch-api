import { Injectable } from '@nestjs/common';
import { Watch } from 'src/lib/types/watch';
import { CreateWatchDto } from './dto/create-watch-dto';
import { UpdateWatchDto } from './dto/update-watch-dto';

@Injectable()
export class WatchService {
  private readonly watches: Watch[] = [
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

  async findAll(): Promise<Watch[]> {
    return this.watches;
  }

  async findOne(id: string): Promise<Watch | undefined> {
    return this.watches.find((watch) => watch.id === id);
  }

  async create(dto: CreateWatchDto): Promise<Watch> {
    const newWatch = { id: (this.watches.length + 1).toString(), ...dto };

    this.watches.push(newWatch);

    return newWatch;
  }

  async update(dto: UpdateWatchDto): Promise<Watch | undefined> {
    const index = this.watches.findIndex((w) => w.id === dto.id);

    if (index === -1) return undefined;

    this.watches[index] = { ...this.watches[index], ...dto };

    return this.watches[index];
  }

  async delete(id: string): Promise<Watch | undefined> {
    const index = this.watches.findIndex((watch) => watch.id === id);

    if (index === -1) return undefined;

    const [watch] = this.watches.splice(index, 1);
    return watch;
  }
}
