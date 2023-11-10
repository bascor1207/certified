import { OpinionResponseDTO } from '../models/opinion.dto';

export interface OpinionQueryInterface {
  getOpinions(): Promise<OpinionResponseDTO[]>;
  findOpinionById(opinionId: string): Promise<OpinionResponseDTO>;
  findOpinionsByIdCompany(companyId: string): Promise<OpinionResponseDTO[]>;
  findOpinionsByIdUser(userId: string): Promise<OpinionResponseDTO[]>;
}
