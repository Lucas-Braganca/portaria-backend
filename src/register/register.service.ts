import { Injectable, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-task.dto';
import { GetRegistersFilterDto as GetRegistersFilterDto } from './dto/get-tasks-filter-dto';
import { RegisterRepository } from './register.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Register } from './register.entity';
import { User } from '../auth/user.entity';
import { format } from 'date-fns';
@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(RegisterRepository)
    private registerRepository: RegisterRepository,
  ) {}

  async getRegisters(filterDto: GetRegistersFilterDto): Promise<Register[]> {
    return this.registerRepository.getRegisters(filterDto);
  }

  async getRegisterById(id: number, user: User): Promise<Register> {
    const found = await this.registerRepository.findOne({id, user: {id: user.id}});

    if (!found) {
      throw new NotFoundException(`TAsk with Id ${id} not found`);
    }

    return found;
  }

  async createRegister(createTaskDto: CreateRegisterDto, user: User) {
    return this.registerRepository.createRegister(createTaskDto, user);
  }

  async deleteRegister(id: number, user: User): Promise<void> {
    
    const result = await this.registerRepository.delete({id, user: {id: user.id}});
    console.log(result);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }
  }

  async updateTaskStatus(id: number, status: string, user: User): Promise<Register> {
    const register = await this.getRegisterById(id, user);
    register.endHour = format(new Date(), 'HH:mm:ss');
    await register.save();
    return register;
  }
}
