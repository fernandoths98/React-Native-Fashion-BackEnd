import { GetCurrentUserId } from './../common/decorators/get-current-user-id.decorator';
import { TransactionHistoryService } from './transaction-history.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionHistoryDto } from './Dto/transaction-history.dto';
import { GetCurrentUser } from 'src/common/decorators';

@Controller('transaction')
export class TransactionHistoryController {
  constructor(private readonly transactionService: TransactionHistoryService) {}

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
    return this.transactionService.addTransaction(userId, transactionDto);
  }
}
