import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyDTO, CompanyResponseDTO } from '../core/models/company.dto';
import { CompanyCommandRepository } from '@company/core/command/company.command.repository';
import { CompanyQueryRepository } from '@company/core/query/company.query.repository';
import { CompanyEntity } from '@company/core/models/company.entity';

@Controller('companys')
export class CompanyControllerAdapter {
  constructor(
    readonly companyCommandRepository: CompanyCommandRepository,
    readonly companyQueryRepository: CompanyQueryRepository,
  ) {}

  @Get('')
  async getAllCompanys(): Promise<CompanyEntity[]> {
    try {
      return await this.companyQueryRepository.getCompanys();
    } catch (error) {
      return error;
    }
  }

  @Post('/create')
  async createCompany(@Body() companyData: CompanyDTO): Promise<CompanyResponseDTO | void> {
    try {
      return await this.companyCommandRepository.createCompany(companyData);
    } catch (error) {
      throw error;
    }
  }
}
