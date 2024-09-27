import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ order: { id: 'ASC' } });
  }
  create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.save({ ...createCustomerDto });
  }
  findById(id: number) {
    return this.customerRepository.findOneBy({ id });
  }
  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepository.update(id, updateCustomerDto);
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Недостаточно прав для удаления заказчика');
    }
    const customer = await this.customerRepository.findOne({ where: { id } });
    return this.customerRepository.remove(customer);
  }
}
