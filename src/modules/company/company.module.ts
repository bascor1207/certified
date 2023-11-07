import { Module } from '@nestjs/common';
import { CompanyCommandRepository } from './core/command/company.command.repository';
import { CompanyControllerAdapter } from './adapters/company.controller.adapter';
import { CompanyQueryRepository } from './core/query/company.query.repository';
import { CompanyRepositoryAdapter } from './adapters/company.repository.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyEntity, CompanySchema } from './core/models/company.entity';
import { SharedModule } from 'modules/shared.module';

type NeededControllerDependencies = CompanyCommandRepository & CompanyQueryRepository;
const neededDependencies = [CompanyCommandRepository, CompanyQueryRepository];

@Module({
  imports: [MongooseModule.forFeature([{ name: CompanyEntity.name, schema: CompanySchema }]), SharedModule],
  controllers: [CompanyControllerAdapter],
  providers: [
    CompanyRepositoryAdapter,
    {
      provide: CompanyCommandRepository,
      inject: [CompanyRepositoryAdapter],
      useFactory: (companyRepository: CompanyRepositoryAdapter) => new CompanyCommandRepository(companyRepository),
    },
    {
      provide: CompanyQueryRepository,
      inject: [CompanyRepositoryAdapter],
      useFactory: (companyRepository: CompanyRepositoryAdapter) => new CompanyQueryRepository(companyRepository),
    },
    {
      provide: CompanyControllerAdapter,
      inject: neededDependencies,
      useFactory: (neededDependencies: NeededControllerDependencies) => new CompanyCommandRepository(neededDependencies),
    },
  ],
  exports: [
    MongooseModule.forFeature([{ name: CompanyEntity.name, schema: CompanySchema }]),
    CompanyRepositoryAdapter,
    {
      provide: CompanyCommandRepository,
      inject: [CompanyRepositoryAdapter],
      useFactory: (companyRepository: CompanyRepositoryAdapter) => new CompanyCommandRepository(companyRepository),
    },
    {
      provide: CompanyQueryRepository,
      inject: [CompanyRepositoryAdapter],
      useFactory: (companyRepository: CompanyRepositoryAdapter) => new CompanyQueryRepository(companyRepository),
    },
    {
      provide: CompanyControllerAdapter,
      inject: neededDependencies,
      useFactory: (neededDependencies: NeededControllerDependencies) => new CompanyCommandRepository(neededDependencies),
    },
  ],
})
export class CompanyModule {}
