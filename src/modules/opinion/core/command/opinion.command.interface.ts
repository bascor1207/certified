import { OpinionResponseDTO } from '../models/opinion.dto';
import { OpinionEntity } from '../models/opnion.entity';

export interface OpinionCommandInterface {
  createOpinion(opinionData: OpinionEntity): Promise<OpinionResponseDTO | void>;
  findOpinionByIdAndUpdateData(companyId, companyDataToUpdate): Promise<OpinionResponseDTO>;
  deleteOpinionById(opinionId: string): Promise<void>;
}
