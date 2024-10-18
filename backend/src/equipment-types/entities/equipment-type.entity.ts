import { Length } from 'class-validator';
import { Complect } from 'src/complects/entities/complect.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EquipmentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 200)
  name: string;

  @OneToMany(() => Complect, (complect) => complect.equipmentType)
  complects: Complect[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
