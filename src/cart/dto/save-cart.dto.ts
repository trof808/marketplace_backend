import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class SaveCartDto {
  @IsArray()
  @ApiProperty({
    example: [
      { productId: 11, quantity: 2 },
      { productId: 3, quantity: 25 },
    ],
  })
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}
