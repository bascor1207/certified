import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../../auth/auth.constant';

@Injectable()
export class ApiKeyGuards implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractApiKeyFromHeader(request);
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiX2lkIjoiNjU0ZTAxODJiNjI3Y2E2N2VlYWFlMTMxIiwibmFtZSI6IkZlYXR0IiwiZW1haWwiOiJmZWF0dC5jb250YWN0LmluZm9zQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDUiLCJsZXZlbCI6MCwiYXZlcmFnZSI6MCwiX192IjowfSwidXNlcm5hbWUiOiJGZWF0dCIsImlhdCI6MTcwMDE0Njg2MywiZXhwIjoxNzAwMzE5NjYzfQ.8ngvG2LDcjeasHi-SjWSPDwNEmJsOzrVG0sj2bCeii8';
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      if (typeof token === 'string') {
        request['user'] = await this.jwtService.verifyAsync(token, { secret: jwtSecret.secret });
      }
    } catch (error) {
      throw error;
    }
    return true;
  }

  private extractApiKeyFromHeader(request: FastifyRequest): string | string[] {
    return request.headers['x-api-key'];
  }
}
