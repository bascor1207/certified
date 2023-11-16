import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { OpinionCommandRepository } from '../core/command/opinion.command.repository';
import { OpinionDTO, OpinionResponseDTO } from '../core/models/opinion.dto';
import { OpinionQueryRepository } from '../core/query/opinion.query.repository';
import { ApiKeyGuards } from '../../apikey/core/api-key.guard';

@Controller('opinions')
export class OpinionControllerAdapter {
  constructor(
    readonly opinionCommandRepository: OpinionCommandRepository,
    readonly opinionQueryRepository: OpinionQueryRepository,
  ) {}

  @Post('/create')
  async createOpinion(@Body() opinionData: OpinionDTO): Promise<OpinionResponseDTO | void> {
    try {
      return await this.opinionCommandRepository.createOpinion(opinionData);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(ApiKeyGuards)
  @Get('/test')
  test(): string {
    try {
      return 'hello';
    } catch (error) {
      throw error;
    }
  }
}
