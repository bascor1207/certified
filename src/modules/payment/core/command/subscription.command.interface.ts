import { SubscriptionResponseDTO } from '../models/subscription.dto';

export interface SubscriptionCommandInterface {
  createSubscription(companyId: string): Promise<SubscriptionResponseDTO | void>;
  handleWebhook(body: string, signature: string);
}
