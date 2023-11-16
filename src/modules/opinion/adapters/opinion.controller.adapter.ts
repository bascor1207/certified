import { Controller, Get, Post, Body } from '@nestjs/common';
import { OpinionCommandRepository } from '../core/command/opinion.command.repository';
import { OpinionDTO, OpinionResponseDTO } from '../core/models/opinion.dto';
import { OpinionQueryRepository } from '../core/query/opinion.query.repository';

@Controller('opinions')
export class OpinionControllerAdapter {
  constructor(
    readonly opinionCommandRepository: OpinionCommandRepository,
    readonly opinionQueryRepository: OpinionQueryRepository,
  ) {}

  @Get('')
  async getAllOpinions(): Promise<OpinionResponseDTO[]> {
    try {
      return await this.opinionQueryRepository.getOpinions();
    } catch (error) {
      return error;
    }
  }

  @Post('/create')
  async createOpinion(@Body() opinionData: OpinionDTO): Promise<OpinionResponseDTO | void> {
    try {
      return await this.opinionCommandRepository.createOpinion(opinionData);
    } catch (error) {
      throw error;
    }
  }
}
