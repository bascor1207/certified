import { OpinionDTO, OpinionResponseDTO } from '../models/opinion.dto';
import { OpinionEntity } from '../models/opnion.entity';
import { OpinionCommandInterface } from './opinion.command.interface';

export class OpinionCommandRepository {
  constructor(private opinionCommandInterface: OpinionCommandInterface) {}

  async createOpinion(opinionData: OpinionDTO): Promise<OpinionResponseDTO | void> {
    return await this.opinionCommandInterface.createOpinion(opinionData);
  }

  async createOpinionByCompany(opinionData: OpinionDTO): Promise<OpinionResponseDTO | void> {
    return await this.opinionCommandInterface.createOpinionByCompany(opinionData);
  }

  async findOpinionByIdAndUpdateData(opinionId: string, opinionDataToUpdate: Partial<OpinionEntity>): Promise<OpinionResponseDTO> {
    return await this.opinionCommandInterface.findOpinionByIdAndUpdateData(opinionId, opinionDataToUpdate);
  }

  async deleteOpinionById(opinionId: string): Promise<void> {
    return await this.opinionCommandInterface.deleteOpinionById(opinionId);
  }
}
