import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PostsLikesRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async findByUserIdAndPostId(userId: string, postId: string) {
    return this.prisma.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });
  }

  public async likePost(userId: string, postId: string) {
    return this.prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  public async unlikePost(userId: string, postId: string) {
    return this.prisma.like.delete({
      where: { userId_postId: { userId, postId } },
    });
  }

  public async getPostLikes(postId: string, include?: Prisma.LikeInclude) {
    return this.prisma.like.findMany({
      where: { postId },
      include,
    });
  }

  public async getUserLikes(userId: string, include?: Prisma.LikeInclude) {
    return this.prisma.like.findMany({
      where: { userId },
      include,
    });
  }

  public async getPostLikesCount(postId: string) {
    return this.prisma.like.count({
      where: { postId },
    });
  }
}
