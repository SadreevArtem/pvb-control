import { IsEnum, IsOptional, Length } from 'class-validator';
import { OrderStatus } from 'src/types';

export class UpdateOrderDto {
  @IsOptional()
  @Length(2, 200)
  contractNumber?: string;

  @IsOptional()
  contractSigningDate?: Date;

  @IsOptional()
  contractExecutionDate?: Date;

  @IsOptional()
  @Length(2, 200)
  contractText?: string;

  @IsOptional()
  @Length(2, 200)
  complectID?: string;

  @IsOptional()
  @Length(2, 200)
  complectName?: string;

  @IsOptional()
  @Length(2, 200)
  comment?: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
