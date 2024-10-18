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
import { EquipmentTypesService } from './equipment-types.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { EntityNotFoundFilter } from 'src/common/filters/entity-not-found-exception.filter';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UpdateEquipmentTypeDto } from './dto/update-equipment-type.dto';
import { CreateEquipmentTypeDto } from './dto/create-equipment-type.dto';

@Controller('equipment-types')
export class EquipmentTypesController {
  constructor(private readonly equipmentTypeService: EquipmentTypesService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return this.equipmentTypeService.create(createEquipmentTypeDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.equipmentTypeService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getEquipmentTypeById(@Param('id') id: string) {
    return this.equipmentTypeService.findById(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(EntityNotFoundFilter)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipmentTypeDto: UpdateEquipmentTypeDto,
  ) {
    return this.equipmentTypeService.update(id, updateEquipmentTypeDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: User) {
    return this.equipmentTypeService.remove(id, user);
  }
}
