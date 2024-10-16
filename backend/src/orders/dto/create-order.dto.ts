import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import { OrderStatus } from 'src/types';

export class CreateOrderDto {
  @IsNotEmpty()
  @Length(2, 200)
  contractNumber: string;

  @IsDateString()
  contractSigningDate: Date;

  @IsDateString()
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

  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNotEmpty()
  customerId: number;
}
