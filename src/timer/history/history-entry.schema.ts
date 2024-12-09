import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HistoryEntryDocument = HydratedDocument<HistoryEntry>;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class HistoryEntry {
  @Prop({ required: false })
  timerLength: number;

  @Prop({ required: true })
  secondsPassed: number;

  @Prop({ required: false })
  timer: Types.ObjectId;

  @Prop({ required: false })
  note: string;

  @Prop({ required: true })
  user: Types.ObjectId;
}

export const HistoryEntrySchema = SchemaFactory.createForClass(HistoryEntry);
