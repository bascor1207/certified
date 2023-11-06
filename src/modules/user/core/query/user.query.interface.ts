import { UserResponseDTO } from '../models/user.dto';

export interface UserQueryInterface {
  getUsers(): Promise<UserResponseDTO[]>;
  findUserById(userId: string): Promise<UserResponseDTO>;
  findUserByEmail(email: string): Promise<UserResponseDTO>;
}
