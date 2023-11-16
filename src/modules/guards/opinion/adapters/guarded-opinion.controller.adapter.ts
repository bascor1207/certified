import { UseGuards, Controller, Get, Param, Put, Body, Delete, Post } from '@nestjs/common';
import { AuthGuard } from 'modules/auth/core/auth.guard';
import { OpinionControllerAdapter } from 'modules/opinion/adapters/opinion.controller.adapter';
import { OpinionCommandRepository } from 'modules/opinion/core/command/opinion.command.repository';
import { OpinionResponseDTO, OpinionDTO } from 'modules/opinion/core/models/opinion.dto';
import { OpinionQueryRepository } from 'modules/opinion/core/query/opinion.query.repository';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBody
} from '@nestjs/swagger';

@ApiTags('Opinions')
@UseGuards(AuthGuards)
@Controller('opinions')
export class GuardedOpinionControllerAdapter extends OpinionControllerAdapter {
  constructor(
    readonly opinionCommandRepository: OpinionCommandRepository,
    readonly opinionQueryRepository: OpinionQueryRepository,
  ) {
    super(opinionCommandRepository, opinionQueryRepository);
  }

  @Post('/createByCompany')
  async createOpinion(@Body() opinionData: OpinionDTO): Promise<OpinionResponseDTO | void> {
    try {
      return await this.opinionCommandRepository.createOpinionByCompany(opinionData);
    } catch (error) {
      throw error;
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Get all opinions' })
  @ApiOkResponse({
    description: 'The opinions records',
    type: 'OpinionResponseDTO',
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'No opinions can be found',
  })
  @ApiBadRequestResponse({
    description: 'No opinions can be found because missing token',
  })
  async getAllOpinions(): Promise<OpinionResponseDTO[]> {
    try {
      return await this.opinionQueryRepository.getOpinions();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific opinion by ID' })
  @ApiParam({ name: 'id', description: 'Opinion ID', type: String })
  @ApiOkResponse({
    description: 'Opinion found successfully',
    type: 'OpinionResponseDTO',
  })
  @ApiResponse({
    status: 404,
    description: 'Opinion cannot be found',
  })
  async getOpinionById(@Param('id') opinionId: string): Promise<OpinionResponseDTO> {
    try {
      return await this.opinionQueryRepository.findOpinionById(opinionId);
    } catch (error) {
      throw error;
    }
  }

  @Get('company/:id')
  @ApiOperation({ summary: 'Get opinions by Company ID' })
  @ApiParam({ name: 'id', description: 'Company ID', type: String })
  @ApiOkResponse({
    description: 'Opinions found successfully',
    type: 'OpinionResponseDTO',
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Opinions cannot be found for the given Company ID',
  })
  async getOpinionsByIdCompany(@Param('id') companyId: string): Promise<OpinionResponseDTO[]> {
    try {
      return await this.opinionQueryRepository.findOpinionsByIdCompany(companyId);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id/level')
  async getOpinionsByLevelCompany(@Param('id') companyId: string): Promise<OpinionResponseDTO[]> {
    try {
      return await this.opinionQueryRepository.findOpinionsByLevelComapny(companyId);
    } catch (error) {
      throw error;
    }
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get opinions by User ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiOkResponse({
    description: 'Opinions found successfully',
    type: 'OpinionResponseDTO',
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Opinions cannot be found for the given User ID',
  })
  async getOpinionsByIdUser(@Param('id') userId: string): Promise<OpinionResponseDTO[]> {
    try {
      return await this.opinionQueryRepository.findOpinionsByIdUser(userId);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an opinion by ID' })
  @ApiParam({ name: 'id', description: 'Opinion ID', type: String })
  @ApiBody({ type: OpinionDTO })
  @ApiOkResponse({
    description: 'Opinion updated successfully',
    type: 'OpinionResponseDTO',
  })
  @ApiResponse({
    status: 404,
    description: 'Opinion cannot be found',
  })
  @ApiBadRequestResponse({
    description: 'Opinion cannot be updated, please try again',
  })
  async updateOpinionById(
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
  @ApiOperation({ summary: 'Delete an opinion by ID' })
  @ApiParam({ name: 'id', description: 'Opinion ID', type: String })
  @ApiResponse({
    status: 204,
    description: 'Opinion deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Opinion cannot be found',
  })
  @ApiBadRequestResponse({
    description: 'Opinion cannot be deleted, please try again',
  })
  async deleteOpinionById(@Param('id') opinionId: string): Promise<void> {
    try {
      return await this.opinionCommandRepository.deleteOpinionById(opinionId);
    } catch (error) {
      throw error;
    }
  }
}
