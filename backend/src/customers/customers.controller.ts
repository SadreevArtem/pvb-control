import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { EntityNotFoundFilter } from 'src/common/filters/entity-not-found-exception.filter';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.customersService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getCustomerById(@Param('id') id: string) {
    return this.customersService.findById(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.customersService.remove(id, user);
  }
}
