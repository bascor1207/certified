import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserQueryRepository } from '@user/core/query/user.query.repository';
import { jwtSecret } from '../auth.constant';
import { CompanyQueryRepository } from '@company/core/query/company.query.repository';
import { UserEntity } from '@user/core/models/user.entity';
import { UserWithTokenResponseDTO } from '@user/core/models/user.dto';
import { UserCommandRepository } from '@user/core/command/user.command.repository';
import { CompanyEntity } from '@company/core/models/company.entity';
import { CompanyCommandRepository } from '@company/core/command/company.command.repository';
import { CompanyDTO, CompanyWithTokenResponseDTO } from '@company/core/models/company.dto';

@Injectable()
export class AuthService {
  constructor(
    private userQueryRepository: UserQueryRepository,
    private userCommandRepository: UserCommandRepository,
    private companyQueryRepository: CompanyQueryRepository,
    private companyCommandRepository: CompanyCommandRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(userData: UserEntity): Promise<UserWithTokenResponseDTO | void> {
    let user;
    try {
      user = await this.userCommandRepository.createUser(userData);
    } catch (error) {
      return error;
    }
    if (!user) {
      throw new BadRequestException();
    }
    const payload = { sub: user, username: user.firstName };
    const access_token = await this.jwtService.signAsync(payload, { secret: jwtSecret.secret });
    const returnedUser = { user, access_token };
    return returnedUser;
  }

  async createCompany(companyData: CompanyEntity): Promise<CompanyWithTokenResponseDTO | void> {
    try {
      const company = await this.companyCommandRepository.createCompany(companyData);
      if (!company) {
        throw new BadRequestException();
      }
      const payload = { sub: company, companyName: company.name };
      const access_token = await this.jwtService.signAsync(payload, { secret: jwtSecret.secret });
      const returnedCompany = { company, access_token };
      return returnedCompany;
    } catch (error) {
      return error;
    }
  }

  async signInUser(email: string, pass: string): Promise<UserWithTokenResponseDTO | void> {
    const user = await this.userQueryRepository.findUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user, username: user.firstName };
    const access_token = await this.jwtService.signAsync(payload, { secret: jwtSecret.secret });
    const returnedUser = { user, access_token };
    return returnedUser;
  }

  async signInCompany(email: string, pass: string): Promise<CompanyWithTokenResponseDTO | void> {
    const company = await this.companyQueryRepository.findCompanyByEmail(email);
    if (company?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: company, companyName: company.name };
    const access_token = await this.jwtService.signAsync(payload, { secret: jwtSecret.secret });
    const returnedCompany = { company, access_token };
    return returnedCompany;
  }

  async subscribe(companyDTO: CompanyDTO): Promise<any> {
    const company = await this.companyQueryRepository.findCompanyByEmail(companyDTO.email);
    console.log(company);
  }
}
