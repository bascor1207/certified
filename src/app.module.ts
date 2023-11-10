import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GuardedUserModule } from 'modules/guards/user/guarded-user.module';
import { GuardedCompanyModule } from 'modules/guards/company/guarded-company.module';
import { GuardedOpinionModule } from 'modules/guards/opinion/guarded-opinion.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo_db:27017/certified_opinions'),
    GuardedUserModule,
    GuardedCompanyModule,
    GuardedOpinionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
