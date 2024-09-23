import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from './entities/user.entity';
import { EntityNotFoundFilter } from 'src/common/filters/entity-not-found-exception.filter';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashValue } from 'src/helpers/hash';

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
  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserByIdForAdmin(@Param('id') id: string, @AuthUser() user: User) {
    return this.usersService.findByIdForAdmin(+id, user);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @AuthUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    const { role } = user;
    const { password } = updateUserDto;
    return this.usersService.update(+id, role, {
      ...updateUserDto,
      ...(Boolean(password) && { password: await hashValue(password) }),
    });
  }
  @UseGuards(JwtGuard)
  @Get('me')
  async findOwn(@AuthUser() user: User): Promise<User> {
    return this.usersService.findOwn({
      select: {
        email: true,
        username: true,
        id: true,
        avatar: true,
        about: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id: user.id },
    });
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @AuthUser() user: User) {
    await this.usersService.remove(+id, user);
  }
}
