import { CompanyEntity } from '@company/core/models/company.entity';
import { ErrorHandler } from 'error-handler';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpinionCommandInterface } from '../core/command/opinion.command.interface';
import { OpinionResponseDTO } from '../core/models/opinion.dto';
import { OpinionEntity } from '../core/models/opnion.entity';
import { OpinionQueryInterface } from '../core/query/opinion.query.interface';

export class OpinionRepositoryAdapter implements OpinionCommandInterface, OpinionQueryInterface {
  constructor(
    @InjectModel('OpinionEntity') private readonly mongoDB: Model<OpinionEntity>,
    @InjectModel('CompanyEntity') private readonly mongoDBCompany: Model<CompanyEntity>,
    private readonly customError: ErrorHandler,
  ) {}

  //READ
  async getOpinions(): Promise<OpinionResponseDTO[]> {
    try {
      return await this.mongoDB.find().exec();
    } catch (error) {
      return error;
    }
  }

  async findOpinionById(opinionId: string): Promise<OpinionResponseDTO> {
    try {
      return await this.mongoDB.findById(opinionId);
    } catch (error) {
      return error;
    }
  }

  async findOpinionsByIdCompany(companyId: string): Promise<OpinionResponseDTO[]> {
    try {
      return await this.mongoDB.find({ companyId: companyId }).exec();
    } catch (error) {
      return error;
    }
  }

  async findOpinionsByIdUser(userId: string): Promise<OpinionResponseDTO[]> {
    try {
      return await this.mongoDB.find({ userId: userId }).exec();
    } catch (error) {
      return error;
    }
  }

  async findOpinionsByLevelComapny(companyId: string): Promise<OpinionResponseDTO[]> {
    try {
      const company = await this.mongoDBCompany.findById(companyId);
      switch (company.level) {
        case 0:
          return await this.mongoDB.find({ companyId: companyId }).limit(50).exec();
        case 1:
          return await this.mongoDB.find({ companyId: companyId }).limit(150).exec();
        case 2:
          return await this.mongoDB.find({ companyId: companyId }).limit(250).exec();
        case 3:
          return await this.mongoDB.find({ companyId: companyId });
      }
    } catch (error) {
      return error;
    }
  }

  //WRITE
  async createOpinion(opinionData: OpinionEntity): Promise<OpinionResponseDTO | void> {
    try {
      const isCompanyAlreayInDB = await this.mongoDB.findOne({ userId: opinionData.userId }).exec();
      if (isCompanyAlreayInDB) {
        return this.customError.badRequest('Opinion already registered, please connect');
      }
      const newCompany = new this.mongoDB(opinionData);
      return await newCompany.save();
    } catch (error) {
      return error;
    }
  }

  async findOpinionByIdAndUpdateData(opinionId: string, opinionDataToUpdate: Partial<CompanyEntity>): Promise<OpinionResponseDTO> {
    try {
      return this.mongoDB.findByIdAndUpdate(opinionId, opinionDataToUpdate, { new: true }).exec();
    } catch (error) {
      return error;
    }
  }

  async deleteOpinionById(opinionId: string): Promise<void> {
    try {
      await this.mongoDB.findByIdAndDelete(opinionId).exec();
    } catch (error) {
      return error;
    }
  }
}
