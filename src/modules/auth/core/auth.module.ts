import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { AuthController } from '../adapters/auth.controller.adapter';
import { AuthService } from '../adapters/auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '2 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtService,
    AuthService,
    {
      provide: AuthGuard,
      inject: [JwtService, Reflector],
      useFactory: (jwtService: JwtService, reflector: Reflector) => new AuthGuard(reflector, jwtService),
    },
  ],
})
export class AuthModule {}
