import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'modules/shared.module';
import { OpinionControllerAdapter } from './adapters/opinion.controller.adapter';
import { OpinionRepositoryAdapter } from './adapters/opinion.repository.adapter';
import { OpinionCommandRepository } from './core/command/opinion.command.repository';
import { OpinionEntity, OpinionSchema } from './core/models/opnion.entity';
import { OpinionQueryRepository } from './core/query/opinion.query.repository';

type NeededControllerDependencies = OpinionCommandRepository & OpinionQueryRepository;
const neededDependencies = [OpinionCommandRepository, OpinionQueryRepository];

@Module({
  imports: [MongooseModule.forFeature([{ name: OpinionEntity.name, schema: OpinionSchema }]), SharedModule],
  controllers: [OpinionControllerAdapter],
  providers: [
    OpinionRepositoryAdapter,
    {
      provide: OpinionCommandRepository,
      inject: [OpinionRepositoryAdapter],
      useFactory: (opinionRepository: OpinionRepositoryAdapter) => new OpinionCommandRepository(opinionRepository),
    },
    {
      provide: OpinionQueryRepository,
      inject: [OpinionRepositoryAdapter],
      useFactory: (opinionRepository: OpinionRepositoryAdapter) => new OpinionQueryRepository(opinionRepository),
    },
    {
      provide: OpinionControllerAdapter,
      inject: neededDependencies,
      useFactory: (neededDependencies: NeededControllerDependencies) => new OpinionCommandRepository(neededDependencies),
    },
  ],
  exports: [
    MongooseModule.forFeature([{ name: OpinionEntity.name, schema: OpinionSchema }]),
    OpinionRepositoryAdapter,
    {
      provide: OpinionCommandRepository,
      inject: [OpinionRepositoryAdapter],
      useFactory: (opinionRepository: OpinionRepositoryAdapter) => new OpinionCommandRepository(opinionRepository),
    },
    {
      provide: OpinionQueryRepository,
      inject: [OpinionRepositoryAdapter],
      useFactory: (opinionRepository: OpinionRepositoryAdapter) => new OpinionQueryRepository(opinionRepository),
    },
    {
      provide: OpinionControllerAdapter,
      inject: neededDependencies,
      useFactory: (neededDependencies: NeededControllerDependencies) => new OpinionCommandRepository(neededDependencies),
    },
  ],
})
export class OpinionModule {}
