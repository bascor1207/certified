import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { PaymentService } from '../core/payment.service';
import { Response } from 'express';
import { PaymentRequestBody } from '../utils/paymentRequestBody';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  createPayments(@Res() response: Response, @Body() paymentRequestBody: PaymentRequestBody) {
    this.paymentService
      .createPayment(paymentRequestBody)
      .then((res) => {
        response.status(HttpStatus.CREATED).json(res);
      })
      .catch((err) => {
        response.status(HttpStatus.BAD_REQUEST).json(err);
      });
  }
}
