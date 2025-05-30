import { Post, User, Comment } from '@prisma/client';

export type SafeUser = Omit<User, 'password'> & {
  createdAt: string;
};

export type FullPost = Post & {
  author: SafeUser;
  comments: (Comment & {
    author: SafeUser;
  })[];
};

export type BlogListItem = Pick<Post, 'id' | 'title' | 'excerpt' | 'image' | 'category' | 'topics' | 'createdAt'> & {
  author: Pick<User, 'id' | 'name' | 'image'>;
  _count: {
    comments: number;
  };
}; 