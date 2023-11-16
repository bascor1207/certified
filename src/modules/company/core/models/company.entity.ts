import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Factory } from 'nestjs-seeder';

export type CompanyDocument = HydratedDocument<CompanyEntity>;

@Schema()
export class CompanyEntity {
  @Factory((faker) => faker.company.name())
  @Prop({ required: true })
  name: string;
  @Factory((faker) => faker.internet.email)
  @Prop({ required: true })
  email: string;
  @Factory((faker) => faker.internet.password)
  @Prop({ required: true })
  password: string;
  @Factory(() => {
    const minLevel = 0;
    const maxLevel = 3;
    return Math.round(Math.random() * (maxLevel - minLevel) + minLevel);
  })
  @Prop({ required: true })
  level: number;
  @Factory(() => {
    const minLevel = 0;
    const maxLevel = 20;
    return Math.round(Math.random() * (maxLevel - minLevel) + minLevel);
  })
  @Prop({ required: true })
  average: number;
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
