import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id?: string;
  
  @Column()
  username: string;
  
  @Column()
  email: string;
  
  @Column()
  password: string;
  
  @Column()
  salt: string;

  // @OneToMany(type => Task, task=> task.user, {eager: true})
  // tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
