import { InjectModel } from '@nestjs/mongoose';
import { CompanyCommandInterface } from '@company/core/command/company.command.interface';
import { CompanyResponseDTO } from '@company/core/models/company.dto';
import { CompanyEntity } from '@company/core/models/company.entity';
import { CompanyQueryInterface } from '@company/core/query/company.query.interface';
import { ErrorHandler } from 'error-handler';
import { Model } from 'mongoose';

export class CompanyRepositoryAdapter implements CompanyCommandInterface, CompanyQueryInterface {
  constructor(
    @InjectModel('CompanyEntity') private readonly mongoDB: Model<CompanyEntity>,
    private readonly customError: ErrorHandler,
  ) {}

  //READ
  async getCompanys(): Promise<CompanyResponseDTO[]> {
    try {
      return await this.mongoDB.find().exec();
    } catch (error) {
      return error;
    }
  }

  async findCompanyById(companyId: string): Promise<CompanyResponseDTO> {
    try {
      return await this.mongoDB.findById(companyId);
    } catch (error) {
      return error;
    }
  }

  async findCompanyByEmail(email: string): Promise<CompanyResponseDTO> {
    try {
      return await this.mongoDB.findOne({ email }).exec();
    } catch (error) {
      return error;
    }
  }

  async findCompanyByName(name: string): Promise<CompanyResponseDTO> {
    try {
      console.log(name);
      return await this.mongoDB.findOne({ name }).exec();
    } catch (error) {
      return error;
    }
  }

  //WRITE
  async createCompany(companyData: CompanyEntity): Promise<CompanyResponseDTO | void> {
    try {
      const isCompanyAlreayInDB = await this.mongoDB.findOne({ email: companyData.email }).exec();
      if (isCompanyAlreayInDB) {
        return this.customError.badRequest('Company already registered, please connect');
      }
      const newCompany = new this.mongoDB(companyData);
      return await newCompany.save();
    } catch (error) {
      return error;
    }
  }

  async findCompanyByIdAndUpdateData(companyId: string, companyDataToUpdate: Partial<CompanyEntity>): Promise<CompanyResponseDTO> {
    try {
      return this.mongoDB.findByIdAndUpdate(companyId, companyDataToUpdate, { new: true }).exec();
    } catch (error) {
      return error;
    }
  }

  async deleteCompanyById(companyId: string): Promise<void> {
    try {
      await this.mongoDB.findByIdAndDelete(companyId).exec();
    } catch (error) {
      return error;
    }
  }

  async findCompanyByIdAndChangePassword(companyId: string, value: Pick<CompanyEntity, 'password'>): Promise<CompanyResponseDTO> {
    try {
      const company = await this.mongoDB.findById(companyId).exec();
      company.password = value.password;
      return company;
    } catch (error) {
      return error;
    }
  }
}
