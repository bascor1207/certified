import { Module } from '@nestjs/common';
import { ErrorHandler } from 'error-handler';

@Module({
  providers: [ErrorHandler],
  exports: [ErrorHandler],
})
export class SharedModule {}
