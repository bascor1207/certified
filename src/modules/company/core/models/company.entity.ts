import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<CompanyEntity>;

@Schema()
export class CompanyEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  level: number;

  @Prop({ required: true })
  average: number;
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
