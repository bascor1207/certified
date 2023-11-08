import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from '../core/models/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/user/login')
  signInUser(@Body() loginDTO: LoginDTO) {
    return this.authService.signInUser(loginDTO.email, loginDTO.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/company/login')
  signInCompany(@Body() loginDTO: LoginDTO) {
    return this.authService.signInCompany(loginDTO.email, loginDTO.password);
  }
}
