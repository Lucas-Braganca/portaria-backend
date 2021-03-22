import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-task.dto';
import { GetRegistersFilterDto as GetRegistersFilterDto } from './dto/get-tasks-filter-dto';
import { Register } from './register.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('register')
@UseGuards(AuthGuard())
export class RegisterController {
  private logger = new Logger('RegisterController');

  constructor(private taskService: RegisterService) {}

  @Get()
  getRegisters(
    @Query(ValidationPipe) filterDto: GetRegistersFilterDto,
    @GetUser() user: User): Promise<Register[]>{
      this.logger.verbose(`User "${user.username} retrieving all registers. Filters: ${JSON.stringify(filterDto)}"`);
    return this.taskService.getRegisters(filterDto);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User): Promise<Register>{
    return this.taskService.getRegisterById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createRegisterDto: CreateRegisterDto,
    @GetUser() user: User,
    ): Promise<Register> {
      this.logger.verbose(`User "${user.username} create a new register. Data: ${JSON.stringify(createRegisterDto)}"`);
      return this.taskService.createRegister(createRegisterDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number,
  @GetUser() user: User): Promise<void>{
    return this.taskService.deleteRegister(id, user);
  }

  @Patch('/:id/exit')
  updateTaskStatus( 
      @Param('id', ParseIntPipe) id: number,
      @Body() status: string,
      @GetUser() user: User
  ): Promise<Register> {
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
