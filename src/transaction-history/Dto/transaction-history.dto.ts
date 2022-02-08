import { IsNotEmpty } from 'class-validator';

export class TransactionHistoryDto {
  @IsNotEmpty()
  total_price?: number;

}
