import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompanyQueryRepository } from '@company/core/query/company.query.repository';
import { CompanyDTO } from '@company/core/models/company.dto';
import { jwtSecret } from '../../auth/auth.constant';

@Injectable()
export class ApiKeyService {
  constructor(
    private companyQueryRepository: CompanyQueryRepository,
    private jwtService: JwtService,
  ) {}

  async subscribe(companyDTO: CompanyDTO): Promise<any> {
    const company = await this.companyQueryRepository.findCompanyByEmail(companyDTO.email);
    if (!company) {
      throw new BadRequestException();
    }
    const payload = { sub: company, username: company.name };
    const apiKey = await this.jwtService.signAsync(payload, { secret: jwtSecret.secret });
    return { message: 'Subscription proceeded', apiKey };
  }
}
