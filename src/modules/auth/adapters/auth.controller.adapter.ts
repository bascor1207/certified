import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}

// async createUserToken(email: string): Promise<UserResponseDTO> {
//     try {
//       const user = await this.findUserByEmail(email);
//       const payload = { sub: user, username: user.firstName };
//       console.log(this.jwtService.sign(payload));

//       const access_token = await this.jwtService.signAsync(payload);
//       console.log(access_token);

//       return { access_token } as unknown as UserResponseDTO;
//       //   return access_token as unknown as UserResponseDTO;
//     } catch (error) {
//       return error;
//     }
//   }
