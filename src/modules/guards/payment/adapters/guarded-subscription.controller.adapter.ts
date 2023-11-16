import { Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuards } from 'modules/auth/core/auth.guard';
import { SubscriptionControllerAdapter } from 'modules/payment/adapters/subscription.controller.adapter';
import { SubscriptionCommandRepository } from 'modules/payment/core/command/subscription.command.repository';
import { SubscriptionResponseDTO } from 'modules/payment/core/models/subscription.dto';
import { ApiKeyService } from '../../../apikey/adapters/api-key.service';

@UseGuards(AuthGuards)
@Controller('subscription')
export class GuardedSubscriptionControllerAdapter extends SubscriptionControllerAdapter {
  constructor(
    readonly subscriptionCommandRepository: SubscriptionCommandRepository,
    private readonly apiKeyService: ApiKeyService,
  ) {
    super();
  }

  @Post(':id')
  async createSubscription(@Param('id') companyId: string): Promise<any | (SubscriptionResponseDTO & { apiKey: string })> {
    try {
      const apiKey = await this.apiKeyService.subscribe(companyId);
      const subscription = await this.subscriptionCommandRepository.createCompany(companyId);
      if (subscription) {
        const { _id, companyId, active } = subscription;
        return { _id, apiKey, companyId, active };
      }
    } catch (error) {
      throw error;
    }
  }

  @Post('/webhook/payment')
  async handleStripeHook(@Req() req: Request, @Res() res: Response) {
    try {
      this.subscriptionCommandRepository.handleWebHook(req.body, (req.headers['stripe-signature'] as string) || '');
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
