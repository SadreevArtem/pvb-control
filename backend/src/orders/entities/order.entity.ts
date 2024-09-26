import { Length } from 'class-validator';
import { Customer } from 'src/customers/entities/customer.entity';
import { OrderStatus } from 'src/types';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 200)
  contractNumber: string;

  @Column({ type: 'date' }) // дата подписания контракта
  contractSingingDate: Date;

  @Column({ type: 'date' }) // дата исполнения контракта
  contractExecutionDate: Date;

  @Column()
  @Length(2, 200)
  contractText: string;

  @Column()
  @Length(2, 200)
  complectID: string;

  @Column()
  @Length(2, 200)
  complectName: string;

  @Column()
  @Length(2, 200)
  comment: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.IN_PROGRESS, //статус по умолчанию
  })
  status: OrderStatus;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer; // заказчик

  @ManyToOne(() => User, (user) => user.orders)
  owner: User; // связь с пользователем, который является владельцем заказа

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
