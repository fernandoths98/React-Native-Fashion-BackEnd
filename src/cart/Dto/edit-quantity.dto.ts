import { IsNotEmpty } from 'class-validator';

export class EditQuantityDto {
  @IsNotEmpty()
  quantity: number;
}
