import { Controller, Post, Req, Res, UseGuards, Param } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from 'modules/auth/core/auth.guard';
import { SubscriptionControllerAdapter } from 'modules/payment/adapters/subscription.controller.adapter';
import { SubscriptionCommandRepository } from 'modules/payment/core/command/subscription.command.repository';
import { SubscriptionResponseDTO } from 'modules/payment/core/models/subscription.dto';

@UseGuards(AuthGuard)
@Controller('subscription')
export class GuardedSubscriptionControllerAdapter extends SubscriptionControllerAdapter {
  constructor(readonly subscriptionCommandRepository: SubscriptionCommandRepository) {
    super(subscriptionCommandRepository);
  }

  @Post(':id')
  async createSubscription(@Param('id') companyId: string): Promise<void | SubscriptionResponseDTO> {
    try {
      return await this.subscriptionCommandRepository.createCompany(companyId);
    } catch (error) {
      throw error;
    }
  }

  @Post('/webhook')
  async handleStripeHook(@Req() req: Request, @Res() res: Response) {
    try {
      this.subscriptionCommandRepository.handleWebHook(req.body, (req.headers['stripe-signature'] as string) || '');
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
