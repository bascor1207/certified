import { Controller, Get, UseGuards } from '@nestjs/common';
// import { UserDTO, UserResponseDTO } from '../core/models/user.dto';
import { UserCommandRepository } from '@user/core/command/user.command.repository';
import { UserQueryRepository } from '@user/core/query/user.query.repository';
import { UserEntity } from '@user/core/models/user.entity';
import { AuthGuard } from 'modules/auth/core/auth.guard';

@Controller('guard')
export class GuardedUserControllerAdapter {
  constructor(
    readonly userCommandRepository: UserCommandRepository,
    readonly userQueryRepository: UserQueryRepository,
  ) {}

  @UseGuards(AuthGuard)
  @Get('')
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userQueryRepository.getUsers();
    } catch (error) {
      return error;
    }
  }
}
