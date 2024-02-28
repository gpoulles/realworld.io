export interface UserApiResponse {
  user: User;
}

export interface User {
  email: 'string';
  token: 'string';
  username: 'string';
  bio: 'string';
  image: 'string';
}

export interface UserLoginApiDto {
  email: string;
  password: string;
}

export interface UserRegisterApiDto extends UserLoginApiDto {
  username: string;
}
