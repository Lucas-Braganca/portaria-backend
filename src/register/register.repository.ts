import { Repository, EntityRepository } from 'typeorm';
import { Register } from './register.entity';
import { CreateRegisterDto } from './dto/create-task.dto';
import { GetRegistersFilterDto } from './dto/get-tasks-filter-dto';
import { User } from '../auth/user.entity';
import { format } from 'date-fns';

@EntityRepository(Register)
export class RegisterRepository extends Repository<Register> {
  async createRegister(createRegisterDto: CreateRegisterDto, user: User): Promise<Register> {
    const { cpf, firstPhone, fullName, local, rg, secondPhone } = createRegisterDto;

    const register = new Register();
    register.fullName = fullName;
    register.local = local;
    register.cpf = cpf;
    register.rg = rg;
    register.firstPhone = firstPhone;
    register.secondPhone = secondPhone;
    const today = new Date();
    register.registerDate = format(today, 'dd/MM/yyyy');
    register.startHour = format(today, 'HH:mm:ss');
    register.user = user;
    await register.save();
    delete register.user;
    return register;
  }

  async getRegisters(filterDto: GetRegistersFilterDto): Promise<Register[]>{
    const {fullName, today} = filterDto;
    const query = this.createQueryBuilder('register');

       if(fullName) {
        query.andWhere('register.full_name LIKE :fullName', {fullName: `%${fullName}%`});
       }

       if(today) {
         const day = format(new Date(), 'dd/MM/yyyy');
         query.andWhere('register.register_date = :day', {day});
       }
    
    const registers = await query.getMany();
    return registers;
  }
}
