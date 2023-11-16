import { CompanyResponseDTO } from '../models/company.dto';
import { CompanyEntity } from '../models/company.entity';
import { CompanyQueryInterface } from './company.query.interface';
import { BadRequestException } from '@nestjs/common';

export class CompanyQueryRepository {
  constructor(private readonly companyQueryInterface: CompanyQueryInterface) {}

  async getCompanies(): Promise<CompanyEntity[]> {
    return await this.companyQueryInterface.getCompanies();
  }

  async findCompanyById(companyId: string): Promise<CompanyResponseDTO> {
    if (!companyId) {
      throw new BadRequestException('no company id was provided');
    }
    return await this.companyQueryInterface.findCompanyById(companyId);
  }

  async findCompanyByEmail(email: string): Promise<CompanyResponseDTO> {
    if (!email) {
      throw new BadRequestException('no company email was provided');
    }
    return await this.companyQueryInterface.findCompanyByEmail(email);
  }

  async findCompanyByName(name: string): Promise<CompanyResponseDTO> {
    return await this.companyQueryInterface.findCompanyByName(name);
  }
}
