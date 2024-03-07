export interface ArticlesApiResponse {
  articles: BasicArticleApiResponse[];
  articlesCount: number;
}

export interface ArticleApiResponse {
  article: BasicArticleApiResponse;
}
export interface BasicArticleApiResponse {
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
  following: boolean;
}
export interface ArticlesApiFilters {
  offset: number;
  tag?: string;
  author?: string;
  favorited?: string;
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
