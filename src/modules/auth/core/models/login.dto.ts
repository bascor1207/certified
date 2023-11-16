import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    description: 'The email of the account',
    example: 'my-registered-account@my-site.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'The password of the account',
    example: 'mySecretPasswordOfMyRegisteredAccount',
  })
  @IsAlphanumeric()
  @MinLength(5)
  readonly password: string;
}
