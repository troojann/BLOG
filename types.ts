
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  imageUrl: string;
}

export interface MagicDraftResponse {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
}
