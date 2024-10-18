import { Module } from '@nestjs/common';
import { EquipmentTypesController } from './equipment-types.controller';
import { EquipmentTypesService } from './equipment-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentType } from './entities/equipment-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentType])],
  providers: [EquipmentTypesService],
  controllers: [EquipmentTypesController],
  exports: [EquipmentTypesService],
})
export class EquipmentTypesModule {}
