export interface UserApiResponse {
  user: UserApi;
}

export interface UserApi {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface UserLoginApiDto {
  user: BasicUserApi;
}

interface BasicUserApi {
  email: string;
  password: string;
}

interface UserProfileApi extends BasicUserApi {
  username: string;
  bio?: string;
  image?: string;
}

export interface UserRegisterApiDto {
  user: Omit<UserProfileApi, 'bio' | 'image'>;
}

export interface UserUpdateApiDto {
  user: Partial<UserProfileApi>;
}
