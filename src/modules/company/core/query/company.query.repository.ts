import { CompanyResponseDTO } from '../models/company.dto';
import { CompanyEntity } from '../models/company.entity';
import { CompanyQueryInterface } from './company.query.interface';

export class CompanyQueryRepository {
  constructor(private readonly companyQueryInterface: CompanyQueryInterface) {}

  async getCompanies(): Promise<CompanyEntity[]> {
    return await this.companyQueryInterface.getCompanies();
  }

  async findCompanyById(companyId: string): Promise<CompanyResponseDTO> {
    return await this.companyQueryInterface.findCompanyById(companyId);
  }

  async findCompanyByEmail(email: string): Promise<CompanyResponseDTO> {
    return await this.companyQueryInterface.findCompanyByEmail(email);
  }
}
