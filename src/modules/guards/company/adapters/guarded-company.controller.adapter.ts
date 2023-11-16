import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuards } from 'modules/auth/core/auth.guard';
import { CompanyCommandRepository } from '@company/core/command/company.command.repository';
import { CompanyQueryRepository } from '@company/core/query/company.query.repository';
import { CompanyEntity } from '@company/core/models/company.entity';
import { CompanyDTO, CompanyResponseDTO } from '@company/core/models/company.dto';
import { CompanyControllerAdapter } from '@company/adapters/company.controller.adapter';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiOkResponse, ApiBadRequestResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Companies')
@UseGuards(AuthGuards)
@Controller('companies')
export class GuardedCompanyControllerAdapter extends CompanyControllerAdapter {
  constructor(
    readonly companyCommandRepository: CompanyCommandRepository,
    readonly companyQueryRepository: CompanyQueryRepository,
  ) {
    super(companyCommandRepository, companyQueryRepository);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all companies' })
  @ApiOkResponse({
    description: 'The company records',
    type: 'CompanyEntity',
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'No companies can be found',
  })
  @ApiBadRequestResponse({
    description: 'No companies can be found because missing token',
  })
  async getAllCompanies(): Promise<CompanyEntity[]> {
    try {
      return await this.companyQueryRepository.getCompanies();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID', type: String })
  @ApiOkResponse({
    description: 'Company found successfully',
    type: 'CompanyResponseDTO',
  })
  @ApiResponse({
    status: 404,
    description: 'Company cannot be found',
  })
  async getCompanyById(@Param('id') companyId: string): Promise<CompanyResponseDTO> {
    try {
      return await this.companyQueryRepository.findCompanyById(companyId);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID', type: String })
  @ApiBody({ type: CompanyDTO })
  @ApiOkResponse({
    description: 'Company updated successfully',
    type: 'CompanyResponseDTO',
  })
  @ApiResponse({
    status: 404,
    description: 'Company cannot be found',
  })
  @ApiBadRequestResponse({
    description: 'Company cannot be updated, please try again',
  })
  async updateCompanyById(
    @Param('id') companyId: string,
    @Body() companyDataToUpdate: Partial<CompanyDTO>,
  ): Promise<CompanyResponseDTO> {
    try {
      return await this.companyCommandRepository.findCompanyByIdAndUpdateData(companyId, companyDataToUpdate);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID', type: String })
  @ApiResponse({
    status: 204,
    description: 'Company deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Company cannot be found',
  })
  @ApiBadRequestResponse({
    description: 'Company cannot be deleted, please try again',
  })
  async deleteCompanyById(@Param('id') companyId: string): Promise<void> {
    try {
      return await this.companyCommandRepository.deleteCompanyById(companyId);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id/password')
  @ApiOperation({ summary: "Change a company's password by ID" })
  @ApiParam({ name: 'id', description: 'Company ID', type: String })
  @ApiBody({ schema: { type: 'string', title: 'password', example: 'MyNewPassword' } })
  @ApiOkResponse({
    description: 'Password changed successfully',
  })
  @ApiBadRequestResponse({
    description: 'Password cannot be changed, please try again',
  })
  async changePassword(@Param('id') companyId: string, @Body() value: Pick<CompanyDTO, 'password'>) {
    try {
      return await this.companyCommandRepository.findCompanyByIdAndChangePassword(companyId, value);
    } catch (error) {
      throw error;
    }
  }
}
