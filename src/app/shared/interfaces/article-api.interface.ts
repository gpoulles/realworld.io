export interface ArticlesApiResponse {
  articles: ArticleApiResponse[];
  articlesCount: 0;
}

export interface ArticleApiResponse {
  article: ArticleApiResponse;
}
export interface ArticleApiResponse {
  author: AuthorApiResponse;
  slug: 'string';
  title: 'string';
  description: 'string';
  body: 'string';
  tagList: ['string'];
  createdAt: '2024-02-24T13:31:46.917Z';
  updatedAt: '2024-02-24T13:31:46.917Z';
  favorited: true;
  favoritesCount: 0;
}
interface AuthorApiResponse {
  username: 'string';
  bio: 'string';
  image: 'string';
  following: true;
}
export interface ArticlesApiFilters {
  offset: number;
  tag?: string;
}
