import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { UserRole } from 'src/types';

export class CreateUserDto {
  @IsString()
  @Length(2, 30)
  username: string;
  @IsString()
  @IsOptional()
  @Length(2, 200)
  about: string;
  @IsOptional()
  @IsUrl()
  avatar: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
