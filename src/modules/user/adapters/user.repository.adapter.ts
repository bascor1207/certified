import { InjectModel } from '@nestjs/mongoose';
import { UserCommandInterface } from '@user/core/command/user.command.interface';
import { UserResponseDTO } from '@user/core/models/user.dto';
import { UserEntity } from '@user/core/models/user.entity';
import { UserQueryInterface } from '@user/core/query/user.query.interface';
import { ErrorHandler } from 'error-handler';
import { Model } from 'mongoose';

export class UserRepositoryAdapter implements UserCommandInterface, UserQueryInterface {
  constructor(
    @InjectModel('UserEntity') private readonly mongoDB: Model<UserEntity>,
    private readonly customError: ErrorHandler,
  ) {}

  //READ
  async getUsers(): Promise<UserResponseDTO[]> {
    try {
      return await this.mongoDB.find().exec();
    } catch (error) {
      return error;
    }
  }

  async findUserById(userId: string): Promise<UserResponseDTO> {
    try {
      return await this.mongoDB.findById(userId);
    } catch (error) {
      return error;
    }
  }

  //WRITE
  async createUser(userData: UserEntity): Promise<UserResponseDTO | void> {
    try {
      const isUserAlreayInDB = await this.mongoDB.findOne({ email: userData.email }).exec();
      if (isUserAlreayInDB) {
        return this.customError.badRequest('User already registered, please connect');
      }
      const newUser = new this.mongoDB(userData);
      return await newUser.save();
    } catch (error) {
      return error;
    }
  }

  async findUserByIdAndUpdateData(userId: string, userDataToUpdate: Partial<UserEntity>): Promise<UserResponseDTO> {
    try {
      return this.mongoDB.findByIdAndUpdate(userId, userDataToUpdate, { new: true }).exec();
    } catch (error) {
      return error;
    }
  }

  async deleteUserById(userId: string): Promise<void> {
    try {
      await this.mongoDB.findByIdAndDelete(userId).exec();
    } catch (error) {
      return error;
    }
  }

  async findUserByIdAndChangePassword(userId: string, value: Pick<UserEntity, 'password'>): Promise<UserResponseDTO> {
    try {
      const user = await this.mongoDB.findById(userId).exec();
      user.password = value.password;
      return user;
    } catch (error) {
      return error;
    }
  }

  async findUserByEmail(email: string): Promise<UserResponseDTO> {
    try {
      return await this.mongoDB.findOne({ email }).exec();
    } catch (error) {
      return error;
    }
  }
}
