import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { GuardedSubscriptionControllerAdapter } from './adapters/guarded-subscription.controller.adapter';

@Module({
  imports: [AuthModule],
  controllers: [GuardedSubscriptionControllerAdapter],
  exports: [AuthModule],
})
export class GuardedSubscriptionModule {}
