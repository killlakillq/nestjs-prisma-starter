import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PostsLikesRepository } from './repositories/posts-likes.repository';
import { PostsRepository } from './repositories/posts.repository';
import { PostsService } from './posts.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [
    PostsResolver,
    PostsService,
    PostsRepository,
    PostsLikesRepository,
  ],
  exports: [PostsService, PostsRepository, PostsLikesRepository],
})
export class PostsModule {}
