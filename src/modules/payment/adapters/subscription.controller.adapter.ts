import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { ErrorHandler } from 'error-handler';
import { SubscriptionCommandRepository } from '../core/command/subscription.command.repository';
import { SubscriptionResponseDTO } from '../core/models/subscription.dto';

@Controller('subscription')
export class SubscriptionControllerAdapter {
  constructor(
    private readonly subscriptionCommandRepository: SubscriptionCommandRepository,
    private readonly customError: ErrorHandler,
  ) {}

  @Post('')
  async createSubscription(@Body() companyId: string): Promise<void | SubscriptionResponseDTO> {
    try {
      return await this.subscriptionCommandRepository.createCompany(companyId);
    } catch (error) {
      return this.customError.badRequest('Internal Serveur Error ! Something went wrong while creating the subscription !');
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
