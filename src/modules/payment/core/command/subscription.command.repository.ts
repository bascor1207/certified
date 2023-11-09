import { SubscriptionResponseDTO } from '../models/subscription.dto';
import { SubscriptionCommandInterface } from './subscription.command.interface';

export class SubscriptionCommandRepository {
  constructor(private subscriptionCommandInterface: SubscriptionCommandInterface) {}

  async createCompany(companyId: string): Promise<SubscriptionResponseDTO | void> {
    return await this.subscriptionCommandInterface.createSubscription(companyId);
  }

  async handleWebHook(body: string, signature: string) {
    await this.subscriptionCommandInterface.handleWebhook(body, signature);
  }
}
