import { AxiosInstance } from "axios";

export namespace Butter {
  interface Response {
    data?: any;
    status?: number;
    statusText?: string;
    headers?: Record<string, any>;
    config?: Record<string, any>;
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

  ////////////
  // Author //
  ////////////

  interface AuthorParams {
    /**
     * Get 10 most recent articles by the author
     */
    include?: 'recent_posts'
  }

  interface Author<AuthorSlug extends string = string> {
    first_name: string
    last_name: string
    email: string
    slug: AuthorSlug
    bio: string
    title: string
    linkedin_url: `https://www.linkedin.com/in/${string}`
    facebook_url: `https://www.facebook.com/${string}`
    pinterest_url: `https://www.pinterest.com/${string}`
    instagram_url: `https://www.instagram.com/${string}`
    twitter_handle: string
    profile_image: `https://cdn.buttercms.com/${string}`
    recent_posts: Record<string, any>[]
  }

  interface AuthorRetrieveResponse<AuthorSlug extends string = string> extends Response {
    data: {
      data: Author<AuthorSlug>
    }
  }

  interface AuthorListResponse extends Response {
    data: {
      data: Author[]
    }
  }

  interface AuthorMethods {
    retrieve<AuthorSlug extends string = string>(slug: string, params?: AuthorParams): Promise<AuthorRetrieveResponse<AuthorSlug>>;
    list(params?: AuthorParams): Promise<AuthorListResponse>;
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
