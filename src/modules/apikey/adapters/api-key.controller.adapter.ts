// import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
//
// import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
// import { CompanyDTO } from '@company/core/models/company.dto';
// import { ApiTags } from '@nestjs/swagger';
// import { ApiKeyService } from './api-key.service';
// import { AuthGuards } from '../../auth/core/auth.guard';
//
// @UseGuards(AuthGuards)
// @ApiTags('API-KEY')
// @Controller('subscribe')
// export class ApiKeyController {
//   constructor(private readonly apiKeyService: ApiKeyService) {}
//   @ApiCreatedResponse({
//     description: 'Company successfully subscribed !',
//   })
//   @ApiBadRequestResponse({
//     description: 'Company cannot subscribe please try again',
//   })
//   @HttpCode(HttpStatus.OK)
//   @Post('/company')
//   subscribeToProgram(@Body() companyDTO: CompanyDTO) {
//     return this.apiKeyService.subscribe(companyDTO);
//   }
// }
