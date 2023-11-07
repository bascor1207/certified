import { UserResponseDTO } from '../models/user.dto';
import { UserEntity } from '../models/user.entity';
import { UserQueryInterface } from './user.query.interface';

export class UserQueryRepository {
  constructor(private readonly userQueryInterface: UserQueryInterface) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.userQueryInterface.getUsers();
  }

  async findUserById(userId: string): Promise<UserResponseDTO> {
    return await this.userQueryInterface.findUserById(userId);
  }

  async findUserByEmail(email: string): Promise<UserResponseDTO> {
    return await this.userQueryInterface.findUserByEmail(email);
  }
}
