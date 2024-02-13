import axios, { AxiosInstance } from "axios";
import { User, UserData } from "../types/user";

export default class GitHubApi {
  private static instance: GitHubApi;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.github.com",
    });
  }

  public static getInstance(): GitHubApi {
    if (!GitHubApi.instance) {
      GitHubApi.instance = new GitHubApi();
    }
    return GitHubApi.instance;
  }

  public async searchUsers(
    query: string,
    page: number,
    perPage: number
  ): Promise<{ users: User[]; count: number }> {
    try {
      const response: any = await this.axiosInstance.get("/search/users", {
        params: {
          q: query,
          page,
          per_page: perPage,
          sort: "followers",
          order: "desc",
        },
      });
      return {
        users: response.data.items,
        count: response.data.total_count,
      };
    } catch (error) {
      console.error("Error fetching users: ", error);
      throw error;
    }
  }

  public async getUserDetails(user: string): Promise<UserData> {
    try {
      const response: any = await this.axiosInstance.get(`/users/${user}`, {});
      return {
        login: response.data.login,
        id: response.data.id,
        avatar_url: response.data.avatar_url,
        followers: response.data.followers,
        following: response.data.following,
        repositories: response.data.public_repos,
      };
    } catch (error) {
      console.error("Error fetching users: ", error);
      throw error;
    }
  }
}
