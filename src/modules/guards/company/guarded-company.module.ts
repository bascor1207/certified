import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { GuardedCompanyControllerAdapter } from './adapters/guarded-company.controller.adapter';

@Module({
  imports: [AuthModule],
  controllers: [GuardedCompanyControllerAdapter],
  exports: [AuthModule],
})
export class GuardedCompanyModule {}
