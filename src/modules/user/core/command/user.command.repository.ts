import { UserResponseDTO } from '../models/user.dto';
import { UserEntity } from '../models/user.entity';
import { UserCommandInterface } from './user.command.interface';

export class UserCommandRepository {
  constructor(private userCommandInterface: UserCommandInterface) {}

  async createUser(userData: UserEntity): Promise<UserResponseDTO | void> {
    return await this.userCommandInterface.createUser(userData);
  }

  async findUserByIdAndUpdateData(userId: string, userDataToUpdate: Partial<UserEntity>): Promise<UserResponseDTO> {
    return await this.userCommandInterface.findUserByIdAndUpdateData(userId, userDataToUpdate);
  }

  async deleteUserById(userId: string): Promise<void> {
    return await this.userCommandInterface.deleteUserById(userId);
  }

  async findUserByIdAndChangePassword(userId: string, value: Pick<UserEntity, 'password'>) {
    return await this.userCommandInterface.findUserByIdAndChangePassword(userId, value);
  }
}
