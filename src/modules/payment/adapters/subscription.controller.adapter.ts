import { Controller, Param, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
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
