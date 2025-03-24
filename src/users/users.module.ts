import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PasswordService } from '../auth/password.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [],
  providers: [UsersService, PasswordService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
