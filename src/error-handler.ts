import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandler {
  badRequest(message: string) {
    throw new BadRequestException(message);
  }
}
