import { IsNotEmpty, IsString, IsEmail, IsAlphanumeric, MinLength, IsNumber } from 'class-validator';

export class CompanyDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsAlphanumeric()
  @MinLength(5)
  readonly password: string;

  @IsNumber()
  @IsNotEmpty()
  readonly level: number;

  @IsNumber()
  @IsNotEmpty()
  readonly average: number;
}

export type CompanyResponseDTO = CompanyDTO & {
  _id: unknown;
};

export type CompanyWithTokenResponseDTO = {
  company: CompanyResponseDTO;
  access_token: string;
};
