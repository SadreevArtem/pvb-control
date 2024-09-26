import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { OrderStatus } from 'src/types';

export class CreateOrderDto {
  @IsNotEmpty()
  @Length(2, 200)
  contractNumber: string;

  @IsNotEmpty()
  contractSigningDate: Date;

  @IsNotEmpty()
  contractExecutionDate: Date;

  @IsNotEmpty()
  @Length(2, 200)
  contractText: string;

  @IsNotEmpty()
  @Length(2, 200)
  complectID: string;

  @IsNotEmpty()
  @Length(2, 200)
  complectName: string;

  @IsOptional()
  @Length(2, 200)
  comment: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNotEmpty()
  customerId: number;
}
