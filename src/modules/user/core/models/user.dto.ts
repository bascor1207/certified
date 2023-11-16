import { IsNotEmpty, IsString, IsEmail, IsAlphanumeric, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'JohnDoe@my-site.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'The password of the user, need to be 5 characters long',
    example: 'iamaverystrongpassword12345',
  })
  @IsAlphanumeric()
  @MinLength(5)
  readonly password: string;
}

export type UserResponseDTO = UserDTO & {
  _id: unknown;
};

export type UserWithTokenResponseDTO = {
  user: UserResponseDTO;
  access_token: string;
};
