import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompanyQueryRepository } from '@company/core/query/company.query.repository';
import { jwtSecret } from '../../auth/auth.constant';

@Injectable()
export class ApiKeyService {
  constructor(
    private companyQueryRepository: CompanyQueryRepository,
    private jwtService: JwtService,
  ) {}

  async subscribe(companyId: string): Promise<any> {
    const company = await this.companyQueryRepository.findCompanyById(companyId);
    if (!company) {
      throw new BadRequestException();
    }
    const payload = { sub: company, username: company.name };
    return await this.jwtService.signAsync(payload, { secret: jwtSecret.secret });;
  }
}
