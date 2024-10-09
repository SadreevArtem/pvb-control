import { Length } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Complect {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 200)
  name: string; // Название комплекта

  @Column()
  equipmentType: string; // Вид оборудования

  @Column()
  manufacturer: string; // Изготовитель

  @Column()
  technicalSpecifications: string; // Технические условия

  @Column()
  brand: string; // Марка

  @Column()
  model: string; // Модель

  @Column()
  diameter: number; // Диаметр

  @Column()
  workingPressure: number; // Рабочее давление

  @Column()
  ballType: string; // Шар - тип

  @Column()
  seatType: string; // Седло - тип

  @Column()
  execution: string; // Исполнение

  @Column()
  trTs: string; // ТР ТС

  @Column({ nullable: true })
  startDate: Date; // Дата старта

  @Column({ nullable: true })
  acceptanceStartDate: Date; // Дата старта приемки

  @Column({ nullable: true })
  documentReadinessDate: Date; // Дата готовности документов

  @Column({ nullable: true })
  shipmentDate: Date; // Дата отгрузки

  @ManyToOne(() => Order, (order) => order.complects, { onDelete: 'CASCADE' })
  order: Order; // Связь с заказом

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
