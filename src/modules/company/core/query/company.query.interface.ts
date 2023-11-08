import { CompanyResponseDTO } from '../models/company.dto';

export interface CompanyQueryInterface {
  getCompanys(): Promise<CompanyResponseDTO[]>;
  findCompanyById(companyId: string): Promise<CompanyResponseDTO>;
  findCompanyByEmail(email: string): Promise<CompanyResponseDTO>;
}
