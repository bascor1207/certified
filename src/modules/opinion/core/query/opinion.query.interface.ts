import { OpinionResponseDTO } from '../models/opinion.dto';

export interface OpinionQueryInterface {
  getOpinions(): Promise<OpinionResponseDTO[]>;
  findOpinionById(opinionId: string): Promise<OpinionResponseDTO>;
}
