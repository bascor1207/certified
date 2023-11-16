import { Controller } from '@nestjs/common';
import { CompanyCommandRepository } from '@company/core/command/company.command.repository';
import { CompanyQueryRepository } from '@company/core/query/company.query.repository';

@Controller('companies')
export class CompanyControllerAdapter {
  constructor(
    readonly companyCommandRepository: CompanyCommandRepository,
    readonly companyQueryRepository: CompanyQueryRepository,
  ) {}
}
