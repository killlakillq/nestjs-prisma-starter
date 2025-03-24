import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { User } from '../../users/models/user.model';
import { Post } from './post.model';

@ObjectType()
export class Like extends BaseModel {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  postId: string;

  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => Post, { nullable: true })
  post: Post | null;
}
