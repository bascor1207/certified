import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from '../core/models/login.dto';
import { UserDTO, UserWithTokenResponseDTO } from '@user/core/models/user.dto';
import { CompanyDTO, CompanyWithTokenResponseDTO } from '@company/core/models/company.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'User successfully registered !',
  })
  @ApiBadRequestResponse({
    description: 'User cannot register please try again',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/user/register')
  async createUser(@Body() userData: UserDTO): Promise<UserWithTokenResponseDTO | void> {
    try {
      return await this.authService.createUser(userData);
    } catch (error) {
      throw error;
    }
  }

  @ApiCreatedResponse({
    description: 'Company successfully registered !',
  })
  @ApiBadRequestResponse({
    description: 'Company cannot register please try again',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/company/register')
  async createCompany(@Body() companyData: CompanyDTO): Promise<CompanyWithTokenResponseDTO | void> {
    try {
      return await this.authService.createCompany(companyData);
    } catch (error) {
      throw error;
    }
  }

  @ApiCreatedResponse({
    description: 'User successfully signed in !',
  })
  @ApiBadRequestResponse({
    description: 'User cannot sign in please try again',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/user/login')
  signInUser(@Body() loginDTO: LoginDTO) {
    return this.authService.signInUser(loginDTO.email, loginDTO.password);
  }

  @ApiCreatedResponse({
    description: 'Company successfully signed in !',
  })
  @ApiBadRequestResponse({
    description: 'Company cannot sign in please try again',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/company/login')
  signInCompany(@Body() loginDTO: LoginDTO) {
    return this.authService.signInCompany(loginDTO.email, loginDTO.password);
  }

  @ApiCreatedResponse({
    description: 'Company successfully subscribed !',
  })
  @ApiBadRequestResponse({
    description: 'Company cannot subscribe please try again',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/company/subscribe')
  subscribeToProgram(@Body() companyDTO: CompanyDTO) {
    return this.authService.subscribe(companyDTO);
  }
}
