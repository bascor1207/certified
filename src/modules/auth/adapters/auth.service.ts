import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserQueryRepository } from '@user/core/query/user.query.repository';
import { jwtSecret } from '../auth.constant';
import { CompanyQueryRepository } from '@company/core/query/company.query.repository';

@Injectable()
export class AuthService {
  constructor(
    private userQueryRepository: UserQueryRepository,
    private companyQueryRepository: CompanyQueryRepository,
    private jwtService: JwtService,
  ) {}

  async signInUser(email: string, pass: string) {
    const user = await this.userQueryRepository.findUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user, username: user.firstName };
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: jwtSecret.secret }),
    };
  }

  async signInCompany(email: string, pass: string) {
    const company = await this.companyQueryRepository.findCompanyByEmail(email);
    if (company?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: company, username: company.name };
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: jwtSecret.secret }),
    };
  }
}
