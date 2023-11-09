import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GuardedUserModule } from 'modules/guards/user/guarded-user.module';
import { GuardedCompanyModule } from 'modules/guards/company/guarded-company.module';
import { GuardedSubscriptionModule } from 'modules/guards/payment/guarded-subscription.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo_db:27017/certified_opinions'),
    GuardedUserModule,
    GuardedCompanyModule,
    GuardedSubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
