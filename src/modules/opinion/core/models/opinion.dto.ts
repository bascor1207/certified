import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class OpinionDTO {
  @ApiProperty({
    description: 'The message of the opinion',
    example: 'Great experience with the company!',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    description: 'The user ID associated with the opinion',
    example: 'user123',
  })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({
    description: 'The company ID associated with the opinion',
    example: 'company456',
  })
  @IsString()
  @IsNotEmpty()
  readonly companyId: string;

  @ApiProperty({
    description: 'The status of the opinion, 0 not certified, 1 certified',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly status: number;
}

export type OpinionResponseDTO = OpinionDTO & {
  _id: unknown;
};
