import { GetCurrentUserId } from './../common/decorators/get-current-user-id.decorator';
import { TransactionHistoryService } from './transaction-history.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionHistoryDto } from './Dto/transaction-history.dto';
import { GetCurrentUser } from 'src/common/decorators';
import { CartService } from 'src/cart/cart.service';

@Controller('transaction')
export class TransactionHistoryController {
  constructor(
    private readonly transactionService: TransactionHistoryService,
    private readonly cartService: CartService,
  ) {}

  @Get()
  async getTransactionHistory(
    @GetCurrentUser('sub') userId: number,
  ): Promise<any> {
    return this.transactionService.getTransactionHistory(userId);
  }

  @Post('/add')
  async addTransaction(
    @GetCurrentUserId() userId: number,
    @Body() transactionDto: TransactionHistoryDto,
  ): Promise<any> {
    const transactionResult = await this.transactionService.addTransaction(
      userId,
      transactionDto,
    );

    const cartDeleteResult = await this.cartService.deleteCart(userId);

    // console.log('Cart Delete', cartDeleteResult);

    return transactionResult;
  }
}
