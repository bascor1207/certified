import { IsNotEmpty, IsString } from 'class-validator';

export class SubscriptionDTO {
  @IsString()
  @IsNotEmpty()
  readonly companyId: string;

  @IsString()
  @IsNotEmpty()
  readonly active: boolean;
}

export type SubscriptionResponseDTO = SubscriptionDTO & {
  _id: unknown;
};
