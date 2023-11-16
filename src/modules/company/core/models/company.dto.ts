import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsAlphanumeric, MinLength, IsNumber } from 'class-validator';

export class CompanyDTO {
  @ApiProperty({
    description: 'The name of the company',
    example: 'ABC Company',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'The email of the company',
    example: 'info@abc-company.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'The password of the company, need to be 5 characters long',
    example: 'strongpassword12345',
  })
  @IsAlphanumeric()
  @MinLength(5)
  readonly password: string;

  @ApiProperty({
    description: "The level of the company for it's subscription",
    example: 3,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly level: number;

  @ApiProperty({
    description: 'The average score of the company by user notation',
    example: 4.5,
  })
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
