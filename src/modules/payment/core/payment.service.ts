import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRequestBody } from '../utils/paymentRequestBody';
import { STRIPE_SECRET_KEY } from '../utils/configStripe';

@Injectable()
export class PaymentService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  createPayment(paymentRequestBody: PaymentRequestBody): Promise<any> {
    return this.stripe.paymentIntents.create({
      amount: paymentRequestBody.price,
      currency: paymentRequestBody.currency,
    });
  }
}
