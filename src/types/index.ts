export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

export interface Post {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl?: string;
  author: User;
  tags: string[];
  createdAt: string;
  comments: Comment[];
  reactions: Reaction[];
}
