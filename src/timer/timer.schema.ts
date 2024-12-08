import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TimerDocument = HydratedDocument<Timer>;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Timer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  length: number;

  @Prop({ required: true })
  user: Types.ObjectId;
}

export const TimerSchema = SchemaFactory.createForClass(Timer);
