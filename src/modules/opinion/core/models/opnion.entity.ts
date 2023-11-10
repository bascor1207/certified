import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OpinionDocument = HydratedDocument<OpinionEntity>;

@Schema()
export class OpinionEntity {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true })
  status: number;
}

export const OpinionSchema = SchemaFactory.createForClass(OpinionEntity);
