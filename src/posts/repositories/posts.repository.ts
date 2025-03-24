import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreatePostInput } from '../dto/createPost.input';

@Injectable()
export class PostsRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(args: CreatePostInput) {
    return this.prisma.post.create({ data: { ...args, published: true } });
  }

  public async find(args: Prisma.PostFindManyArgs) {
    return this.prisma.post.findMany(args);
  }

  public async findById(args: Prisma.PostFindUniqueArgs) {
    return this.prisma.post.findUnique(args);
  }
}
