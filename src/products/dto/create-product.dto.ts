import { IsInt, Min, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  availableCount: number;

  category_id?: number;
}
