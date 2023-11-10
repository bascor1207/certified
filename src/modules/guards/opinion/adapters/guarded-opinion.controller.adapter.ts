import { UseGuards, Controller, Get, Param, Put, Body, Delete } from '@nestjs/common';
import { AuthGuard } from 'modules/auth/core/auth.guard';
import { OpinionControllerAdapter } from 'modules/opinion/adapters/opinion.controller.adapter';
import { OpinionCommandRepository } from 'modules/opinion/core/command/opinion.command.repository';
import { OpinionResponseDTO, OpinionDTO } from 'modules/opinion/core/models/opinion.dto';
import { OpinionEntity } from 'modules/opinion/core/models/opnion.entity';
import { OpinionQueryRepository } from 'modules/opinion/core/query/opinion.query.repository';

@UseGuards(AuthGuard)
@Controller('opinions')
export class GuardedOpinionControllerAdapter extends OpinionControllerAdapter {
  constructor(
    readonly opinionCommandRepository: OpinionCommandRepository,
    readonly opinionQueryRepository: OpinionQueryRepository,
  ) {
    super(opinionCommandRepository, opinionQueryRepository);
  }

  @Get('')
  async getAllOpinions(): Promise<OpinionResponseDTO[]> {
    try {
      return await this.opinionQueryRepository.getOpinions();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getOpinionById(@Param('id') opinionId: string): Promise<OpinionResponseDTO> {
    try {
      return await this.opinionQueryRepository.findOpinionById(opinionId);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getOpinionsByIdCompany(@Param('id') companyId: string): Promise<OpinionResponseDTO[]> {
    try {
      return await this.opinionQueryRepository.findOpinionsByIdCompany(companyId);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getOpinionsByIdUser(@Param('id') userId: string): Promise<OpinionResponseDTO[]> {
    try {
      return await this.opinionQueryRepository.findOpinionsByIdUser(userId);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async updateCompanyById(
    @Param('id') opinionId: string,
    @Body() opinionDataToUpdate: Partial<OpinionDTO>,
  ): Promise<OpinionResponseDTO> {
    try {
      return await this.opinionCommandRepository.findOpinionByIdAndUpdateData(opinionId, opinionDataToUpdate);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteOpinionById(@Param('id') opinionId: string): Promise<void> {
    try {
      return await this.opinionCommandRepository.deleteOpinionById(opinionId);
    } catch (error) {
      throw error;
    }
  }
}
