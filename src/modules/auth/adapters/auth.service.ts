import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserQueryRepository } from '@user/core/query/user.query.repository';
import { jwtSecret } from '../auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private userQueryRepository: UserQueryRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.userQueryRepository.findUserByEmail(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user, username: user.firstName };
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: jwtSecret.secret }),
    };
  }
}
