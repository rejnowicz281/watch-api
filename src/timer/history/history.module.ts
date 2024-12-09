import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryEntry, HistoryEntrySchema } from './history-entry.schema';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  providers: [HistoryService],
  controllers: [HistoryController],
  imports: [
    MongooseModule.forFeature([
      {
        name: HistoryEntry.name,
        schema: HistoryEntrySchema,
      },
    ]),
  ],
})
export class HistoryModule {}
