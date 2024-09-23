import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Equal, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashValue } from 'src/helpers/hash';
import { UserRole } from 'src/types';
import { UpdateUserDto } from './dto/update-user.dto';

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
  //for validate user
  findOne(query: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail(query);
  }
  //get info about user
  findOwn(query: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail(query);
  }
  async update(id: number, role, updateUserDto: UpdateUserDto) {
    if (role !== UserRole.ADMIN) {
      throw new BadRequestException('Недостаточно прав');
    }
    // if (await this.userExists(updateUserDto)) {
    //   throw new BadRequestException(
    //     'Пользователь с указанными данными уже зарегистрирован',
    //   );
    // }
    return this.userRepository.update({ id }, updateUserDto);
  }
  findById(id: number) {
    return this.userRepository.findOneBy({ id }); // for validation
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для удаления пользователя',
      );
    }
    const userToDelete = await this.userRepository.findOneBy({ id });
    if (!userToDelete) {
      throw new BadRequestException('Пользователь не найден');
    }
    return this.userRepository.remove(userToDelete);
  }
  // Метод для получения данных пользователя по ID для администратора
  async findByIdForAdmin(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException(
        'Недостаточно прав для просмотра данных пользователя',
      );
    }

    const userById = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    return userById;
  }
}
