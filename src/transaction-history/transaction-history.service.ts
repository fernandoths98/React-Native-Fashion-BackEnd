import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionHistoryDto } from './Dto/transaction-history.dto';
import { TransactionHistory } from './models/transaction-history.entity';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectRepository(TransactionHistory)
    private readonly transactionHistoryRepository: Repository<TransactionHistory>,
  ) {}

  async addTransaction(userId: number, transactionDto: TransactionHistoryDto) {
    return await this.transactionHistoryRepository.save({
      total_price: transactionDto.total_price,
    });
  }

  async getTransactionHistory(userId: number) {
    return await this.transactionHistoryRepository.find();
  }
}
