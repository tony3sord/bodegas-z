import { IsString } from 'class-validator';

export class UpdateProduct {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  readonly amount: number;
  readonly price: number;
}
