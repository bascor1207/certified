import { Controller } from '@nestjs/common';
import { UserCommandRepository } from '@user/core/command/user.command.repository';
import { UserQueryRepository } from '@user/core/query/user.query.repository';
@Controller('users')
export class UserControllerAdapter {
  constructor(
    readonly userCommandRepository: UserCommandRepository,
    readonly userQueryRepository: UserQueryRepository,
  ) {}
}
