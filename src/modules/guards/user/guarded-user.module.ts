import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { GuardedUserControllerAdapter } from './adapters/guarded-user.controller.adapter';

@Module({
  imports: [AuthModule],
  controllers: [GuardedUserControllerAdapter],
  exports: [AuthModule],
})
export class GuardedUserModule {}
