export interface User {
  login: string;
  id: number;
  avatar_url: string;
  followers: number;
};

export interface UserData {
  login: string;
  id: number;
  avatar_url: string;
  followers: number;
  following: number;
  repositories: number;
}
