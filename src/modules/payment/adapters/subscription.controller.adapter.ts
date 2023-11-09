import { Controller } from '@nestjs/common';
import { SubscriptionCommandRepository } from '../core/command/subscription.command.repository';

@Controller('subscription')
export class SubscriptionControllerAdapter {
  constructor(readonly subscriptionCommandRepository: SubscriptionCommandRepository) {}
}
