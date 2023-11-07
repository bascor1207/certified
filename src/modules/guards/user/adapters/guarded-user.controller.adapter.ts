import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
// import { UserDTO, UserResponseDTO } from '../core/models/user.dto';
import { UserCommandRepository } from '@user/core/command/user.command.repository';
import { UserQueryRepository } from '@user/core/query/user.query.repository';
import { UserEntity } from '@user/core/models/user.entity';
import { AuthGuard } from 'modules/auth/core/auth.guard';
import { UserDTO, UserResponseDTO } from '@user/core/models/user.dto';
import { UserControllerAdapter } from '@user/adapters/user.controller.adapter';

@UseGuards(AuthGuard)
@Controller('users')
export class GuardedUserControllerAdapter extends UserControllerAdapter {
  constructor(
    readonly userCommandRepository: UserCommandRepository,
    readonly userQueryRepository: UserQueryRepository,
  ) {
    super(userCommandRepository, userQueryRepository);
  }

  @Get('')
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userQueryRepository.getUsers();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<UserResponseDTO> {
    try {
      return await this.userQueryRepository.findUserById(userId);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async updateUserById(@Param('id') userId: string, @Body() userDataToUpdate: Partial<UserDTO>): Promise<UserResponseDTO> {
    try {
      return await this.userCommandRepository.findUserByIdAndUpdateData(userId, userDataToUpdate);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteUserById(@Param('id') userId: string): Promise<void> {
    try {
      return await this.userCommandRepository.deleteUserById(userId);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id/password')
  async changePassword(@Param('id') userId: string, @Body() value: Pick<UserDTO, 'password'>) {
    try {
      return await this.userCommandRepository.findUserByIdAndChangePassword(userId, value);
    } catch (error) {
      throw error;
    }
  }
}
