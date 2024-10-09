import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { CustomersModule } from 'src/customers/customers.module';
import { ComplectsModule } from 'src/complects/complects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UsersModule,
    CustomersModule,
    forwardRef(() => ComplectsModule),
  ],
  exports: [OrdersService],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
