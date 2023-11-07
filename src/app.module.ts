import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from '@company/company.module';
// import { AuthModule } from 'modules/auth/core/auth.module';
import { GuardedUserModule } from 'modules/guards/user/guarded-user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo_db:27017/certified_opinions'), GuardedUserModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
