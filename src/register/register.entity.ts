import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Register extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  local: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column({ name: 'first_phone' })
  firstPhone: string;

  @Column({ name: 'second_phone', nullable: true })
  secondPhone?: string;

  @Column({ name: 'register_date' })
  registerDate: string;

  @Column({ name: 'start_hour' })
  startHour: string;

  @Column({ name: 'end_hour', nullable: true })
  endHour?: string;

  @ManyToOne(
    type => User,
    user => user.registers,
    { eager: false },
  )
  user: User;
}
