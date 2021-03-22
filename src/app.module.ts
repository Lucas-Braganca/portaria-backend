import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), RegisterModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
