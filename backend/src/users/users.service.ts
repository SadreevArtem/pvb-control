import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Equal, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashValue } from 'src/helpers/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private async userExists(createUserDto: CreateUserDto): Promise<boolean> {
    return !!(await this.userRepository.findOne({
      where: [
        { username: Equal(createUserDto.username) },
        { email: Equal(createUserDto.email) },
      ],
    }));
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.userExists(createUserDto)) {
      throw new BadRequestException(
        'Пользователь с указанными данными уже существует',
      );
    }
    const { password } = createUserDto;
    return this.userRepository.save({
      ...createUserDto,
      password: await hashValue(password),
    });
  }
  findAll(): Promise<User[]> {
    return this.userRepository.find({ order: { id: 'ASC' } });
  }

  findOne(query: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail(query);
  }
  findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
