import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Factory } from 'nestjs-seeder';

export type OpinionDocument = HydratedDocument<OpinionEntity>;

@Schema()
export class OpinionEntity {
  @Factory((faker) => faker.lorem.paragraph)
  @Prop({ required: true })
  message: string;
  @Factory((faker) => faker.database.mongodbObjectId)
  @Prop({ required: true })
  userId: string;
  @Factory((faker) => faker.database.mongodbObjectId)
  @Prop({ required: true })
  companyId: string;
  @Factory(() => {
    const minLevel = 0;
    const maxLevel = 3;
    return Math.round(Math.random() * (maxLevel - minLevel) + minLevel);
  })
  @Prop({ required: true })
  status: number;
}

export const OpinionSchema = SchemaFactory.createForClass(OpinionEntity);
