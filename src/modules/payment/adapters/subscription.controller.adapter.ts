import { Controller, Param, Post } from '@nestjs/common';
import { SubscriptionCommandRepository } from '../core/command/subscription.command.repository';
import { SubscriptionResponseDTO } from '../core/models/subscription.dto';

@Controller('subscription')
export class SubscriptionControllerAdapter {
  constructor(readonly subscriptionCommandRepository: SubscriptionCommandRepository) {}

  @Post(':id')
  async createCompanySubscription(@Param('id') companyId: string): Promise<SubscriptionResponseDTO | void> {
    try {
      return await this.subscriptionCommandRepository.createCompany(companyId);
    } catch (error) {
      throw error;
    }
  }
}
