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
import { ComplectsService } from './complects.service';
import { CreateComplectDto } from './dto/create-complect.dto';
import { UpdateComplectDto } from './dto/update-complect.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { AuthUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundFilter } from 'src/common/filters/entity-not-found-exception.filter';

@Controller('complects')
export class ComplectsController {
  constructor(private readonly complectsService: ComplectsService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createComplectDto: CreateComplectDto) {
    return this.complectsService.create(createComplectDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.complectsService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complectsService.findOne(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComplectDto: UpdateComplectDto,
  ) {
    return this.complectsService.update(+id, updateComplectDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  @UseFilters(EntityNotFoundFilter)
  remove(@Param('id') id: string, @AuthUser() user: User) {
    return this.complectsService.remove(+id, user);
  }
}
