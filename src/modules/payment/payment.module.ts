import { Module } from '@nestjs/common';
import { PaymentService } from './core/payment.service';
import { PaymentController } from './adapters/payment.controller';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentsModule {}
