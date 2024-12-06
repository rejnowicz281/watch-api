import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  password: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: false })
  provider?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
