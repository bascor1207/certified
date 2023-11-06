import { CompanyResponseDTO } from '../models/company.dto';
import { CompanyEntity } from '../models/company.entity';

export interface CompanyCommandInterface {
  createCompany(companyData: CompanyEntity): Promise<CompanyResponseDTO | void>;
  findCompanyByIdAndUpdateData(companyId, companyDataToUpdate): Promise<CompanyResponseDTO>;
  deleteCompanyById(companyId: string): Promise<void>;
  findCompanyByIdAndChangePassword(companyId: string, value: Pick<CompanyEntity, 'password'>): Promise<CompanyResponseDTO>;
}
