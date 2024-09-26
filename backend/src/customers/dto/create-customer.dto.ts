import { IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @Length(2, 200)
  name: string;
}
