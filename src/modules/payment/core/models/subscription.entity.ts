import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<SubscriptionEntity>;

@Schema()
export class SubscriptionEntity {
  @Prop({ required: true })
  companyId: string;
  @Prop({ required: true })
  active: boolean;
}

export const SubscriptionSchema = SchemaFactory.createForClass(SubscriptionEntity);
