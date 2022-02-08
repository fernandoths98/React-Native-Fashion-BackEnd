import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TransactionHistory {
  @PrimaryGeneratedColumn()
  id_transaction: number;

  @Column()
  total_price: number;

  @CreateDateColumn()
  currentDate: string;
}
