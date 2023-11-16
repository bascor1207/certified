import { CompanyEntity } from '@company/core/models/company.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from '@user/core/models/user.entity';
import { OpinionEntity } from 'modules/opinion/core/models/opnion.entity';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class AppSeeder implements Seeder {
  constructor(
    @InjectModel('UserEntity') private readonly user: Model<UserEntity>,
    @InjectModel('CompanyEntity') private readonly company: Model<CompanyEntity>,
    @InjectModel('OpinionEntity') private readonly opinion: Model<OpinionEntity>,
  ) {}

  async seed() {
    const users = DataFactory.createForClass(UserEntity).generate(10);
    const companys = DataFactory.createForClass(CompanyEntity).generate(10);
    const opinions = DataFactory.createForClass(OpinionEntity).generate(10);

    console.log(users);
    console.log(companys);
    console.log(opinions);

    // Insert into the database.
    this.user.insertMany(users);
    this.company.insertMany(companys);
    this.opinion.insertMany(opinions);
  }

  async drop() {
    this.user.deleteMany({});
    this.company.deleteMany({});
    this.opinion.deleteMany({});
  }
}
