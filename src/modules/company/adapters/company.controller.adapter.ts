import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

  @Post('/register')
  async createCompany(@Body() companyData: CompanyDTO): Promise<CompanyResponseDTO | void> {
    try {
      return await this.companyCommandRepository.createCompany(companyData);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getCompanyById(@Param('id') companyId: string): Promise<CompanyResponseDTO> {
    try {
      return await this.companyQueryRepository.findCompanyById(companyId);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async updateCompanyById(
    @Param('id') companyId: string,
    @Body() companyDataToUpdate: Partial<CompanyDTO>,
  ): Promise<CompanyResponseDTO> {
    try {
      return await this.companyCommandRepository.findCompanyByIdAndUpdateData(companyId, companyDataToUpdate);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteCompanyById(@Param('id') companyId: string): Promise<void> {
    try {
      return await this.companyCommandRepository.deleteCompanyById(companyId);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id/password')
  async changePassword(@Param('id') companyId: string, @Body() value: Pick<CompanyDTO, 'password'>) {
    try {
      return await this.companyCommandRepository.findCompanyByIdAndChangePassword(companyId, value);
    } catch (error) {
      throw error;
    }
  }
}
