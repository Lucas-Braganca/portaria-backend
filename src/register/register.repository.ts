import { Repository, EntityRepository } from 'typeorm';
import { Register } from './register.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Register)
export class TaskRepository extends Repository<Register> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Register> {
    const { title, description } = createTaskDto;

    const task = new Register();
    task.title = title;
    task.description = description;
    task.status = 'open';
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Register[]>{
    const {status, search} = filterDto;
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', {userId: user.id});
    if(status){
      query.andWhere('task.status = :status', {status})
    }
    if(search){
       query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`});
    }
    const tasks = await query.getMany();
    return tasks;

  }
}
