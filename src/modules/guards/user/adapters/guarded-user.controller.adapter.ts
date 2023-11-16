import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags, ApiResponse, ApiBody, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { UserCommandRepository } from '@user/core/command/user.command.repository';
import { UserQueryRepository } from '@user/core/query/user.query.repository';
import { UserEntity } from '@user/core/models/user.entity';
import { AuthGuards } from 'modules/auth/core/auth.guard';
import { UserDTO, UserResponseDTO } from '@user/core/models/user.dto';
import { UserControllerAdapter } from '@user/adapters/user.controller.adapter';

@UseGuards(AuthGuards)
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class GuardedUserControllerAdapter extends UserControllerAdapter {
  constructor(
    readonly userCommandRepository: UserCommandRepository,
    readonly userQueryRepository: UserQueryRepository,
  ) {
    super(userCommandRepository, userQueryRepository);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of users' })
  @ApiOkResponse({
    description: 'The user records',
    type: 'UserResponseDTO',
    isArray: true,
  })
  @ApiCreatedResponse({
    description: 'Users found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'No users can not be found',
  })
  @ApiBadRequestResponse({
    description: 'No users can be found because missing token',
  })
  @ApiResponse({ status: 200, description: 'Successful response', type: 'UserResponseDTO' })
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userQueryRepository.getUsers();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiCreatedResponse({
    description: 'User found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User can not be found',
  })
  async getUserById(@Param('id') userId: string): Promise<UserResponseDTO> {
    try {
      return await this.userQueryRepository.findUserById(userId);
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ type: UserDTO })
  @ApiCreatedResponse({
    description: 'User updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User can not be found',
  })
  @ApiBadRequestResponse({
    description: 'User can not be updated, please try again',
  })
  async updateUserById(@Param('id') userId: string, @Body() userDataToUpdate: Partial<UserDTO>): Promise<UserResponseDTO> {
    try {
      return await this.userCommandRepository.findUserByIdAndUpdateData(userId, userDataToUpdate);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiResponse({
    status: 204,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User can not be found',
  })
  @ApiBadRequestResponse({
    description: 'User can not be deleted, please try again',
  })
  async deleteUserById(@Param('id') userId: string): Promise<void> {
    try {
      return await this.userCommandRepository.deleteUserById(userId);
    } catch (error) {
      return error;
    }
  }

  @Put(':id/password')
  @ApiOperation({ summary: "Change a user's password by ID" })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ schema: { type: 'string', title: 'password', example: 'MyNewPassword' } })
  @ApiCreatedResponse({
    description: 'Password changed successfully',
  })
  @ApiBadRequestResponse({
    description: 'Password cannot be changed, please try again',
  })
  async changePassword(@Param('id') userId: string, @Body() value: Pick<UserDTO, 'password'>) {
    try {
      return await this.userCommandRepository.findUserByIdAndChangePassword(userId, value);
    } catch (error) {
      return error;
    }
  }
}
