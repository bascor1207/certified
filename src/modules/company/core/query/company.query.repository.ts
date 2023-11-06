import { CompanyResponseDTO } from '../models/company.dto';
import { CompanyEntity } from '../models/company.entity';
import { CompanyQueryInterface } from './company.query.interface';

export class CompanyQueryRepository {
  constructor(private readonly companyQueryInterface: CompanyQueryInterface) {}

  async getCompanys(): Promise<CompanyEntity[]> {
    return await this.companyQueryInterface.getCompanys();
  }

  async findCompanyById(companyId: string): Promise<CompanyResponseDTO> {
    return await this.companyQueryInterface.findCompanyById(companyId);
  }
}
