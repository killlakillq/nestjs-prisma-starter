import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async findById(args: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(args);
  }
}
