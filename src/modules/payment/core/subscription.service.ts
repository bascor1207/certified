import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '../utils/configStripe';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(
    subscriptionId: string,
    amount: number,
    currency: string,
    paymentMethodOptions?: object,
  ): Promise<Stripe.PaymentIntent> {
    const params: Stripe.PaymentIntentCreateParams = {
      amount,
      currency,
      payment_method_types: ['card'],
      metadata: {
        subscriptionId,
      },
    };

    if (paymentMethodOptions) {
      params.payment_method_options = paymentMethodOptions;
    }

    try {
      const paymentIntent = await this.stripe.paymentIntents.create(params);
      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Stripe payment intent creation failed.');
    }
  }
}
