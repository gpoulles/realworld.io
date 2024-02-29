export interface UserApiResponse {
  user: User;
}

interface BasicUser {
  email: string;
  password: string;
}

interface UserProfile extends BasicUser {
  username: string;
  bio?: string;
  image?: string;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface UserLoginApiDto {
  user: BasicUser;
}

export interface UserRegisterApiDto {
  user: Omit<UserProfile, 'bio' | 'image'>;
}

export interface UserUpdateApiDto {
  user: Partial<UserProfile>;
}

export interface User extends UserProfile {
  token: string;
}
