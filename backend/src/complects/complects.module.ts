import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplectsService } from './complects.service';
import { ComplectsController } from './complects.controller';
import { Complect } from './entities/complect.entity';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Complect]),
    forwardRef(() => OrdersModule),
  ],
  controllers: [ComplectsController],
  providers: [ComplectsService],
  exports: [ComplectsService],
})
export class ComplectsModule {}
