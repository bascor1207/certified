import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { GuardedSubscriptionControllerAdapter } from './adapters/guarded-subscription.controller.adapter';
import { ApiKeyModule } from '../../apikey/api-key.module';
import { ApiKeyService } from '../../apikey/adapters/api-key.service';

@Module({
  imports: [AuthModule, ApiKeyModule],
  controllers: [GuardedSubscriptionControllerAdapter],
  providers: [ApiKeyService],
  exports: [AuthModule],
})
export class GuardedSubscriptionModule {}
