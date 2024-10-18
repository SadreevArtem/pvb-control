import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentType } from './entities/equipment-type.entity';
import { Repository } from 'typeorm';
import { CreateEquipmentTypeDto } from './dto/create-equipment-type.dto';
import { UpdateEquipmentTypeDto } from './dto/update-equipment-type.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/types';

@Injectable()
export class EquipmentTypesService {
  constructor(
    @InjectRepository(EquipmentType)
    private readonly equipmentTypeRepository: Repository<EquipmentType>,
  ) {}
  findAll(): Promise<EquipmentType[]> {
    return this.equipmentTypeRepository.find({ order: { id: 'ASC' } });
  }
  create(createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return this.equipmentTypeRepository.save({ ...createEquipmentTypeDto });
  }
  findById(id: number) {
    return this.equipmentTypeRepository.findOneBy({ id });
  }
  update(id: number, updateEquipmentTypeDto: UpdateEquipmentTypeDto) {
    return this.equipmentTypeRepository.update(id, updateEquipmentTypeDto);
  }
  async remove(id: number, user: User) {
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Недостаточно прав для удаления заказчика');
    }
    const EquipmentType = await this.equipmentTypeRepository.findOne({
      where: { id },
    });
    return this.equipmentTypeRepository.remove(EquipmentType);
  }
}
