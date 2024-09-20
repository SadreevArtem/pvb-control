import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto, @AuthUser() user: User) {
    return this.usersService.create(createUserDto, user);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@AuthUser() user: User) {
    return this.usersService.findAll(user);
  }
}
