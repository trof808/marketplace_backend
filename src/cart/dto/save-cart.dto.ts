import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class SaveCartDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}
