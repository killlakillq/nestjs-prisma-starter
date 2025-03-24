import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostsLikesRepository } from './repositories/posts-likes.repository';
import { PostsRepository } from './repositories/posts.repository';
import { EXCEPTIONS } from '../common/constants/exceptions.constant';
import { UsersService } from '../users/users.service';
import { CreatePostInput } from './dto/createPost.input';

@Injectable()
export class PostsService {
  public constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postsLikesRepository: PostsLikesRepository,
    private readonly usersService: UsersService,
  ) {}

  public async create(createPostInput: CreatePostInput) {
    return this.postsRepository.create(createPostInput);
  }

  public async findById(id: string) {
    const post = await this.postsRepository.findById({ where: { id } });

    if (!post) {
      throw new NotFoundException(EXCEPTIONS.POST.NOT_FOUND);
    }

    return post;
  }

  public async find() {
    return this.postsRepository.find({
      include: {
        likes: true,
      },
    });
  }

  public async likePost(userId: string, postId: string) {
    const user = await this.usersService.findById(userId);
    const post = await this.findById(postId);

    const like = await this.postsLikesRepository.findByUserIdAndPostId(
      user.id,
      post.id,
    );

    if (like) {
      throw new BadRequestException(EXCEPTIONS.POST.LIKE_ALREADY_EXISTS);
    }

    return this.postsLikesRepository.likePost(user.id, post.id);
  }

  public async unlikePost(userId: string, postId: string) {
    const user = await this.usersService.findById(userId);
    const post = await this.findById(postId);

    const like = await this.postsLikesRepository.findByUserIdAndPostId(
      user.id,
      post.id,
    );

    if (!like) {
      throw new BadRequestException(EXCEPTIONS.POST.LIKE_NOT_FOUND);
    }

    return this.postsLikesRepository.unlikePost(user.id, post.id);
  }

  public async getPostLikes(postId: string) {
    const post = await this.findById(postId);

    return this.postsLikesRepository.getPostLikes(post.id, {
      user: true,
      post: true,
    });
  }

  public async getUserLikes(userId: string) {
    const user = await this.usersService.findById(userId);

    return this.postsLikesRepository.getUserLikes(user.id, {
      user: true,
      post: true,
    });
  }

  public async getPostLikesCount(postId: string) {
    const post = await this.findById(postId);

    return this.postsLikesRepository.getPostLikesCount(post.id);
  }
}
