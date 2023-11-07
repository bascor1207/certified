import { Module } from '@nestjs/common';
import { UserCommandRepository } from './core/command/user.command.repository';
import { UserControllerAdapter } from './adapters/user.controller.adapter';
import { UserQueryRepository } from './core/query/user.query.repository';
import { UserRepositoryAdapter } from './adapters/user.repository.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './core/models/user.entity';
import { ErrorHandler } from 'error-handler';
import { AuthGuard } from 'modules/auth/core/auth.guard';

type NeededControllerDependencies = UserCommandRepository & UserQueryRepository;
const neededDependencies = [UserCommandRepository, UserQueryRepository];

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
  controllers: [UserControllerAdapter],
  providers: [
    ErrorHandler,
    UserRepositoryAdapter,
    AuthGuard,
    {
      provide: UserCommandRepository,
      inject: [UserRepositoryAdapter],
      useFactory: (userRepository: UserRepositoryAdapter) => new UserCommandRepository(userRepository),
    },
    {
      provide: UserQueryRepository,
      inject: [UserRepositoryAdapter],
      useFactory: (userRepository: UserRepositoryAdapter) => new UserQueryRepository(userRepository),
    },
    {
      provide: UserControllerAdapter,
      inject: neededDependencies,
      useFactory: (neededDependencies: NeededControllerDependencies) => new UserCommandRepository(neededDependencies),
    },
  ],
  exports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    ErrorHandler,
    UserRepositoryAdapter,
    AuthGuard,
    {
      provide: UserCommandRepository,
      inject: [UserRepositoryAdapter],
      useFactory: (userRepository: UserRepositoryAdapter) => new UserCommandRepository(userRepository),
    },
    {
      provide: UserQueryRepository,
      inject: [UserRepositoryAdapter],
      useFactory: (userRepository: UserRepositoryAdapter) => new UserQueryRepository(userRepository),
    },
    {
      provide: UserControllerAdapter,
      inject: neededDependencies,
      useFactory: (neededDependencies: NeededControllerDependencies) => new UserCommandRepository(neededDependencies),
    },
  ],
})
export class UserModule {}
