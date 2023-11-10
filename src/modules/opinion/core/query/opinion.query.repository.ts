import { OpinionResponseDTO } from '../models/opinion.dto';
import { OpinionQueryInterface } from './opinion.query.interface';

export class OpinionQueryRepository {
  constructor(private readonly opinionQueryInterface: OpinionQueryInterface) {}

  async getOpinions(): Promise<OpinionResponseDTO[]> {
    return await this.opinionQueryInterface.getOpinions();
  }

  async findOpinionById(opinionId: string): Promise<OpinionResponseDTO> {
    return await this.opinionQueryInterface.findOpinionById(opinionId);
  }

  async findOpinionsByIdCompany(companyId: string): Promise<OpinionResponseDTO[]> {
    return await this.opinionQueryInterface.findOpinionsByIdCompany(companyId);
  }

  async findOpinionsByIdUser(userId: string): Promise<OpinionResponseDTO[]> {
    return await this.opinionQueryInterface.findOpinionsByIdUser(userId);
  }
}
