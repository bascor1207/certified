import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO, UserResponseDTO } from '../core/models/user.dto';
import { UserCommandRepository } from '@user/core/command/user.command.repository';
import { UserQueryRepository } from '@user/core/query/user.query.repository';
@Controller('users')
export class UserControllerAdapter {
  constructor(
    readonly userCommandRepository: UserCommandRepository,
    readonly userQueryRepository: UserQueryRepository,
  ) {}

  @Post('/register')
  async createUser(@Body() userData: UserDTO): Promise<UserResponseDTO | void> {
    try {
      return await this.userCommandRepository.createUser(userData);
    } catch (error) {
      throw error;
    }
  }
}
