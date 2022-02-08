import { IsNotEmpty } from 'class-validator';

export class AddItemCartDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;

  size?: string;

  title_product?: string;

  image?: string;

  price?: number;
}
