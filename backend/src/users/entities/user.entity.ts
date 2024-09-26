import { IsEmail, Length } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { UserRole } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @Length(2, 30)
  username: string;

  @Column({
    default: 'First Name, Last Name',
  })
  @Length(2, 200)
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TENDER_MANAGER, //роль по умолчанию
  })
  role: UserRole;

  @OneToMany(() => Order, (order) => order.owner)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
