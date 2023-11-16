import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ApiKeyGuards } from './core/api-key.guard';
import { jwtSecret } from '../auth/auth.constant';
import { ApiKeyController } from './adapters/api-key.controller.adapter';
import { CompanyModule } from '@company/company.module';
import { ApiKeyService } from './adapters/api-key.service';

@Module({
  imports: [
    CompanyModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '10y' },
      secret: jwtSecret.secret,
    }),
  ],
  controllers: [ApiKeyController],
  providers: [JwtService, ApiKeyGuards, ApiKeyService],
})
export class ApiKeyModule {}
