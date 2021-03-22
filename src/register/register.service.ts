import { Injectable, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './register.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Register } from './register.entity';
import { User } from 'src/auth/user.entity';
@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Register[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Register> {
    const found = await this.taskRepository.findOne({id, userId: user.id});

    if (!found) {
      throw new NotFoundException(`TAsk with Id ${id} not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User) {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    
    const result = await this.taskRepository.delete({id, userId: user.id});
    console.log(result);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }
  }

  async updateTaskStatus(id: number, status: string, user: User): Promise<Register> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
