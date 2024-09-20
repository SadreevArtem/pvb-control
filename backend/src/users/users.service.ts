import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Equal, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashValue } from 'src/helpers/hash';
import { UserRole } from 'src/types';

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

  async create(createUserDto: CreateUserDto, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для создания пользователя',
      );
    }
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
  findAll(user: User): Promise<User[]> {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Недостаточно прав');
    }
    return this.userRepository.find({ order: { id: 'ASC' } });
  }

  findOne(query: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail(query); // TODO:
  }
  findById(id: number) {
    return this.userRepository.findOneBy({ id }); // TODO
  }
}
