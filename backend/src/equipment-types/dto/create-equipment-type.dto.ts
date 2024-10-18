import { IsString, Length } from 'class-validator';

export class CreateEquipmentTypeDto {
  @IsString()
  @Length(2, 200)
  name: string;
}
