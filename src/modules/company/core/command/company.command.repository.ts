import { CompanyDTO, CompanyResponseDTO } from '../models/company.dto';
import { CompanyEntity } from '../models/company.entity';
import { CompanyCommandInterface } from './company.command.interface';

export class CompanyCommandRepository {
  constructor(private companyCommandInterface: CompanyCommandInterface) {}

  async createCompany(companyData: CompanyDTO): Promise<CompanyResponseDTO | void> {
    return await this.companyCommandInterface.createCompany(companyData);
  }

  async findCompanyByIdAndUpdateData(companyId: string, companyDataToUpdate: Partial<CompanyEntity>): Promise<CompanyResponseDTO> {
    return await this.companyCommandInterface.findCompanyByIdAndUpdateData(companyId, companyDataToUpdate);
  }

  async deleteCompanyById(companyId: string): Promise<void> {
    return await this.companyCommandInterface.deleteCompanyById(companyId);
  }

  async findCompanyByIdAndChangePassword(companyId: string, value: Pick<CompanyEntity, 'password'>) {
    return await this.companyCommandInterface.findCompanyByIdAndChangePassword(companyId, value);
  }
}
