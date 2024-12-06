import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: false })
  password?: string;

  @Prop({ required: false })
  name?: string;

  @Prop({ required: false, unique: true })
  email?: string;

  @Prop({ required: false })
  provider?: string;

  @Prop({ required: false })
  subject?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
