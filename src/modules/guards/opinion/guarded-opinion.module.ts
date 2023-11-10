import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { GuardedOpinionControllerAdapter } from './adapters/guarded-opinion.controller.adapter';

@Module({
  imports: [AuthModule],
  controllers: [GuardedOpinionControllerAdapter],
  exports: [AuthModule],
})
export class GuardedOpinionModule {}
