import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class OpinionDTO {
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly companyId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly status: number;
}

export type OpinionResponseDTO = OpinionDTO & {
  _id: unknown;
};

export type OpinionWithTokenResponseDTO = {
  company: OpinionResponseDTO;
  access_token: string;
};
