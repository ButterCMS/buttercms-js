import { AxiosInstance } from "axios";

export namespace Butter {
  interface Response {
    data?: any;
    status?: number;
    statusText?: string;
    headers?: any;
    config?: any;
  }

  interface PostMethods {
    retrieve(slug: string, params?: any): Promise<Response>;
    list(params?: any): Promise<Response>;
    search(query: string, params?: any): Promise<Response>;
  }

  interface CategoryMethods {
    retrieve(slug: string, params?: any): Promise<Response>;
    list(params?: any): Promise<Response>;
  }

  interface TagMethods {
    retrieve(slug: string, params?: any): Promise<Response>;
    list(params?: any): Promise<Response>;
  }

  interface AuthorMethods {
    retrieve(slug: string, params?: any): Promise<Response>;
    list(params?: any): Promise<Response>;
  }

  interface FeedMethods {
    retrieve(slug: string, params?: any): Promise<Response>;
  }

  interface PageMethods {
    retrieve(
      page_type: string,
      page_slug: string,
      params?: any
    ): Promise<Response>;
    list(page_type: string, params?: any): Promise<Response>;
    search(query: string, params?: any): Promise<Response>;
  }

  interface ContentMethods {
    retrieve(keys: Array<string>, params?: any): Promise<Response>;
  }
}

export class ButterStatic {
  post: Butter.PostMethods;
  category: Butter.CategoryMethods;
  tag: Butter.TagMethods;
  author: Butter.AuthorMethods;
  feed: Butter.FeedMethods;
  page: Butter.PageMethods;
  content: Butter.ContentMethods;
  constructor(
    apiToken: string,
    testMode?: boolean,
    timeout?: number,
    axiosHook?: (axios: AxiosInstance) => unknown
  );
}

export const Butter: (
  apiToken: string,
  testMode?: boolean,
  timeout?: number,
  axiosHook?: (axios: AxiosInstance) => unknown
) => ButterStatic;

export default Butter;
