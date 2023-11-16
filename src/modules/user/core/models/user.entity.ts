import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Factory } from 'nestjs-seeder';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema()
export class UserEntity {
  @Factory((faker) => faker.person.firstName())
  @Prop({ required: true })
  firstName: string;
  @Factory((faker) => faker.person.lastName())
  @Prop({ required: true })
  lastName: string;
  @Factory((faker) => faker.internet.email)
  @Prop({ required: true })
  email: string;
  @Factory((faker) => faker.internet.password)
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
