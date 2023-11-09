import { Model } from 'mongoose';
import Stripe from 'stripe';
import { InjectModel } from '@nestjs/mongoose';
import { SubscriptionCommandInterface } from '../core/command/subscription.command.interface';
import { SubscriptionEntity } from '../core/models/subscription.entity';
import { SubscriptionResponseDTO } from '../core/models/subscription.dto';
import { STRIPE_WEBHOOK_KEY } from '../utils/configStripe';
import { Body } from '@nestjs/common';
import { SubscriptionService } from '../core/subscription.service';

export class SubscriptionRepositoryAdapter implements SubscriptionCommandInterface {
  private stripe;

  constructor(
    @InjectModel('SubscriptionEntity') private readonly mongoDB: Model<SubscriptionEntity>,
    private readonly suscriptionService: SubscriptionService,
  ) {}

  //WRITE
  async createSubscription(companyId: string): Promise<void | SubscriptionResponseDTO> {
    const subscriptionData = new SubscriptionEntity();
    subscriptionData.active = false;
    subscriptionData.companyId = companyId;
    const subscription = new this.mongoDB(subscriptionData);
    try {
      const sub = await this.suscriptionService.createPaymentIntent(subscription.id, 5000, 'eur');
      console.log(sub);
      return await subscription.save();
    } catch (error) {
      console.error('Payment Intent creation failed with error :', error);
      throw error;
    }
  }

  //WRITE
  async handleWebhook(@Body() body: string, signature: string) {
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_KEY);
      console.log(event);
    } catch (error) {
      console.error(`Webhook signature verification failed.`, error);
      throw new Error('A webhook signature verification failed.');
    }
    const data: Stripe.Event.Data = event.data;
    const eventType: string = event.type;

    switch (eventType) {
      case 'payment_intent.succeeded':
        const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent;
        const { subscriptionId } = pi.metadata;
        if (!subscriptionId) throw new Error('No subscription Id Defined');

        const subscription = await this.mongoDB.findOne({ where: { id: subscriptionId } });
        if (!subscription) throw new Error('No Subscription found');

        subscription.active = true;
        const updatedSubscription = this.mongoDB.updateOne({ where: { id: subscriptionId }, data: subscription });
        if (!updatedSubscription) throw new Error('Error while updating subscription');
        break;

      case 'payment_intent.payment_failed':
        console.log('A payment failed', data);
        break;

      default:
        console.error('Unsupported Callback Status on stripe webhook');
        throw new Error('Unsupported Callback Status');
    }
  }
}
