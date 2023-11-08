import { IsNotEmpty, IsString, IsEmail, IsAlphanumeric, MinLength } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

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
