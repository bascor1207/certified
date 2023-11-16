import { Module } from '@nestjs/common';
import { SubscriptionControllerAdapter } from './adapters/subscription.controller.adapter';
import { SubscriptionCommandRepository } from './core/command/subscription.command.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'modules/shared.module';
import { SubscriptionEntity, SubscriptionSchema } from './core/models/subscription.entity';
import { SubscriptionRepositoryAdapter } from './adapters/subscription.repository.adapter';
import { SubscriptionService } from './core/subscription.service';
import { CompanyEntity, CompanySchema } from '@company/core/models/company.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriptionEntity.name, schema: SubscriptionSchema },
      { name: CompanyEntity.name, schema: CompanySchema },
    ]),
    SharedModule,
  ],
  controllers: [SubscriptionControllerAdapter],
  providers: [
    SubscriptionRepositoryAdapter,
    SubscriptionService,
    {
      provide: SubscriptionCommandRepository,
      inject: [SubscriptionRepositoryAdapter],
      useFactory: (subscriptionRepository: SubscriptionRepositoryAdapter) => new SubscriptionCommandRepository(subscriptionRepository),
    },
  ],
  exports: [
    MongooseModule.forFeature([{ name: SubscriptionEntity.name, schema: SubscriptionSchema }]),
    SubscriptionRepositoryAdapter,
    {
      provide: SubscriptionCommandRepository,
      inject: [SubscriptionRepositoryAdapter],
      useFactory: (subscriptionRepository: SubscriptionRepositoryAdapter) => new SubscriptionCommandRepository(subscriptionRepository),
    },
  ],
})
export class SubscriptionModule {}
