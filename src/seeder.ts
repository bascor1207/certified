import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSeeder } from 'app.seeder';
import { UserEntity, UserSchema } from '@user/core/models/user.entity';
import { CompanyEntity, CompanySchema } from '@company/core/models/company.entity';
import { OpinionEntity, OpinionSchema } from 'modules/opinion/core/models/opnion.entity';

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-seeder-sample'),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: CompanyEntity.name, schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: OpinionEntity.name, schema: OpinionSchema }]),
  ],
}).run([AppSeeder]);
