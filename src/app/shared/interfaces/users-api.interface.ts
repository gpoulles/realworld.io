export interface UserApiResponse {
  user: User;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface UserLoginApiDto {
  user: {
    email: string;
    password: string;
  };
}

export interface UserRegisterApiDto {
  user: {
    email: string;
    password: string;
    username: string;
  };
}

export interface UserUpdateApiDto {
  user: {
    email: string;
    password: string;
    username: string;
    bio: string;
    image: string;
  };
}
