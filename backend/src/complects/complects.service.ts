import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complect } from './entities/complect.entity';
import { CreateComplectDto } from './dto/create-complect.dto';
import { UpdateComplectDto } from './dto/update-complect.dto';
import { OrdersService } from 'src/orders/orders.service';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';
import { EquipmentTypesService } from 'src/equipment-types/equipment-types.service';

@Injectable()
export class ComplectsService {
  constructor(
    @InjectRepository(Complect)
    private readonly complectRepository: Repository<Complect>,
    private readonly ordersService: OrdersService,
    private readonly equipmentTypeService: EquipmentTypesService,
  ) {}

  async create(createComplectDto: CreateComplectDto): Promise<Complect> {
    const { orderId, equipmentTypeId, ...complectData } = createComplectDto;
    const equipmentType =
      await this.equipmentTypeService.findById(equipmentTypeId);
    const order = await this.ordersService.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const complect = this.complectRepository.create({
      ...complectData,
      order,
      equipmentType,
    });

    return this.complectRepository.save(complect);
  }

  async findAll(): Promise<Complect[]> {
    return this.complectRepository.find();
  }

  async findOne(id: number): Promise<Complect> {
    const complect = await this.complectRepository.findOne({
      where: { id },
      relations: {
        equipmentType: true,
      },
    });
    if (!complect) {
      throw new NotFoundException(`Complect with id ${id} not found`);
    }
    return complect;
  }

  async update(id: number, updateComplectDto: UpdateComplectDto) {
    const { orderId, equipmentTypeId, ...complectData } = updateComplectDto;
    const equipmentType =
      await this.equipmentTypeService.findById(equipmentTypeId);
    const order = await this.ordersService.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.complectRepository.update(id, {
      ...complectData,
      order,
      equipmentType,
    });
  }

  async remove(id: number, user: User): Promise<void> {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Недостаточно прав для удаления заказчика');
    }
    const complect = await this.findOne(id);
    await this.complectRepository.remove(complect);
  }
}
