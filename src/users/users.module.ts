import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PasswordService } from '../auth/password.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [],
  providers: [UsersResolver, UsersService, PasswordService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
