import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from '../core/models/login.dto';
import { UserDTO, UserWithTokenResponseDTO } from '@user/core/models/user.dto';
import { CompanyDTO, CompanyWithTokenResponseDTO } from '@company/core/models/company.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/user/register')
  async createUser(@Body() userData: UserDTO): Promise<UserWithTokenResponseDTO | void> {
    try {
      return await this.authService.createUser(userData);
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/company/register')
  async createCompany(@Body() companyData: CompanyDTO): Promise<CompanyWithTokenResponseDTO | void> {
    try {
      return await this.authService.createCompany(companyData);
    } catch (error) {
      throw error;
    }
  }

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
