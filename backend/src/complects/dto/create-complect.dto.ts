import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateComplectDto {
  @IsNumber()
  orderId: number; // Связь с заказом через его ID
  @IsString()
  @Length(2, 200)
  name: string;

  @IsString()
  @Length(2, 200)
  equipmentType: string;

  @IsString()
  @Length(2, 200)
  manufacturer: string;

  @IsString()
  @Length(2, 200)
  technicalSpecifications: string;

  @IsString()
  @Length(2, 200)
  brand: string;

  @IsString()
  @Length(2, 200)
  model: string;

  @IsNumber()
  diameter: number;

  @IsNumber()
  workingPressure: number;

  @IsString()
  @Length(2, 200)
  ballType: string;

  @IsString()
  @Length(2, 200)
  seatType: string;

  @IsString()
  @Length(2, 200)
  execution: string;

  @IsString()
  @Length(2, 200)
  trTs: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  acceptanceStartDate?: Date;

  @IsOptional()
  @IsDate()
  documentReadinessDate?: Date;

  @IsOptional()
  @IsDate()
  shipmentDate?: Date;
}
