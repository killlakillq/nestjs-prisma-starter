import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { EXCEPTIONS } from '../../common/constants/exceptions.constant';

@Injectable()
export class UsersService {
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async findById(id: string) {
    const user = await this.usersRepository.findById({ where: { id } });

    if (!user) {
      throw new NotFoundException(EXCEPTIONS.USER.NOT_FOUND);
    }

    return user;
  }
}
