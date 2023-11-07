import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { AuthController } from './adapters/auth.controller.adapter';
import { AuthService } from './adapters/auth.service';
import { AuthGuard } from './core/auth.guard';
import { jwtSecret } from './auth.constant';
import { CompanyModule } from '@company/company.module';
import { SharedModule } from 'modules/shared.module';

@Module({
  imports: [
    SharedModule,
    UserModule,
    CompanyModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '2 days' },
      secret: jwtSecret.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [JwtService, AuthService, AuthGuard],
  exports: [UserModule, CompanyModule, AuthGuard, SharedModule],
})
export class AuthModule {}
