import { LoginApiDto } from './login-api.interface';

export interface RegisterApiDto extends LoginApiDto {
  username: string;
}
