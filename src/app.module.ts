import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyModule } from './modules/apikey/api-key.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { GuardedUserModule } from 'modules/guards/user/guarded-user.module';
import { GuardedCompanyModule } from 'modules/guards/company/guarded-company.module';
import { GuardedSubscriptionModule } from 'modules/guards/payment/guarded-subscription.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    MongooseModule.forRoot('mongodb://mongo_db:27017/certified_opinions'),
    GuardedUserModule,
    GuardedCompanyModule,
    GuardedOpinionModule,
    GuardedSubscriptionModule,
    ApiKeyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
