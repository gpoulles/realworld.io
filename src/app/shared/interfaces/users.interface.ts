interface UserProfile extends BasicUser {
  username: string;
  bio?: string;
  image?: string;
}

interface BasicUser {
  email: string;
}

export interface User extends UserProfile {
  token: string;
}
