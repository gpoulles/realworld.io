export interface ArticlesApiResponse {
  articles: ArticleApiResponse[];
  articlesCount: number;
}

export interface ArticleApiResponse {
  article: ArticleApiResponse;
}
export interface ArticleApiResponse {
  author: AuthorApiResponse;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: [string];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
}
interface AuthorApiResponse {
  username: string;
  bio: string;
  image: string;
  following: true;
}
export interface ArticlesApiFilters {
  offset: number;
  tag?: string;
}

export interface ArticleApiDto {
  article: ArticleApiArticleDto;
}

export interface ArticleApiArticleDto {
  title: string;
  description: string;
  body: string;
  tagList: [string];
}
