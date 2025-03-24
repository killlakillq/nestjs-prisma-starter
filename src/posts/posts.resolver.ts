import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Post } from './models/post.model';
import { CreatePostInput } from './dto/createPost.input';
import { PostsService } from './posts.service';
import { Like } from './models/like.model';

@Resolver(() => Post)
export class PostsResolver {
  public constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post], { name: 'findPosts' })
  public async find() {
    return this.postsService.find();
  }

  @Query(() => Post, { name: 'findPostById' })
  public async findById(@Args('id') id: string) {
    return this.postsService.findById(id);
  }

  @Mutation(() => Post, { name: 'createPost' })
  public async createPost(@Args('data') data: CreatePostInput) {
    return this.postsService.create(data);
  }

  @Mutation(() => Like, { name: 'likePost' })
  public async likePost(
    @Args('userId') userId: string,
    @Args('postId') postId: string,
  ) {
    return this.postsService.likePost(userId, postId);
  }

  @Mutation(() => Like, { name: 'unlikePost' })
  public async unlikePost(
    @Args('userId') userId: string,
    @Args('postId') postId: string,
  ) {
    return this.postsService.unlikePost(userId, postId);
  }

  @Query(() => [Like], { name: 'getPostLikes' })
  public async getPostLikes(@Args('postId') postId: string) {
    return this.postsService.getPostLikes(postId);
  }

  @Query(() => [Like], { name: 'getUserLikes' })
  public async getUserLikes(@Args('userId') userId: string) {
    return this.postsService.getUserLikes(userId);
  }
}
