export interface ProfileApiResponse {
  profile: ProfileApi;
}

export interface ProfileApi {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
