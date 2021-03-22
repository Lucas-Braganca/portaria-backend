import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class Register extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column()
    status: string;

    @Column()
    userId: number;
    
    @ManyToOne(type=> User, user=> user.registers, {eager: false})
    user: User;
}