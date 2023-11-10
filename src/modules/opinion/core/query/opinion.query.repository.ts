import { OpinionResponseDTO } from '../models/opinion.dto';
import { OpinionEntity } from '../models/opnion.entity';
import { OpinionQueryInterface } from './opinion.query.interface';

export class OpinionQueryRepository {
  constructor(private readonly opinionQueryInterface: OpinionQueryInterface) {}

  async getOpinions(): Promise<OpinionEntity[]> {
    return await this.opinionQueryInterface.getOpinions();
  }

  async findOpinionById(opinionId: string): Promise<OpinionResponseDTO> {
    return await this.opinionQueryInterface.findOpinionById(opinionId);
  }
}
