import { UserResponseDTO } from '../models/user.dto';
import { UserEntity } from '../models/user.entity';

export interface UserCommandInterface {
  createUser(userData: UserEntity): Promise<UserResponseDTO | void>;
  findUserByIdAndUpdateData(userId, userDataToUpdate): Promise<UserResponseDTO>;
  deleteUserById(userId: string): Promise<void>;
  findUserByIdAndChangePassword(userId: string, value: Pick<UserEntity, 'password'>): Promise<UserResponseDTO>;
}
