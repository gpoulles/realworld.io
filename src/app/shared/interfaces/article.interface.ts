export interface Articles {
  articles: Article[];
  articlesCount: number;
}

export interface Article {
  author: Author;
  publishedDate: Date;
  slug: string;
  body: string;
  title: string;
  excerpt: string;
  favorites: number;
  tags: string[];
}

export interface Author {
  name: string;
  image: string;
  ownUser?: boolean;
  following?: boolean;
}
