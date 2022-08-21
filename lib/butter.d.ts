import { AxiosInstance } from "axios";

type FlatValue<Type, Key> = Key extends `${infer I}.${infer J}`
  ? I extends keyof Type
    ? FlatValue<NonNullable<Type[I]>, J>
    : never
  : Key extends keyof Type
  ? Type[Key]
  : never;

type FlatKeys<Type, P extends string = ""> = Type extends object
  ? {
      [Key in keyof Type]: FlatKeys<
        Type[Key],
        `${P}${P extends "" ? "" : "."}${Key & string}`
      >;
    }[keyof Type]
  : P;

// Use to flatten types and prefix with "fields." so they can be filtered
type WithFieldsPrefix<Type extends object> = {
  [Key in FlatKeys<Type> as Key extends string
    ? `fields.${Key}`
    : never]?: FlatValue<NonNullable<Type>, Key>;
};

export namespace Butter {
  ///////////////////
  // Utility types //
  ///////////////////

  interface Meta {
    next_page: number | null;
    previous_page: number | null;
    count: number;
  }
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
    include?: "recent_posts";
  }

  interface Author<AuthorSlug extends string = string> {
    first_name: string;
    last_name: string;
    email: string;
    slug: AuthorSlug;
    bio: string;
    title: string;
    linkedin_url: `https://www.linkedin.com/in/${string}`;
    facebook_url: `https://www.facebook.com/${string}`;
    pinterest_url: `https://www.pinterest.com/${string}`;
    instagram_url: `https://www.instagram.com/${string}`;
    twitter_handle: string;
    profile_image: `https://cdn.buttercms.com/${string}`;
    recent_posts: Record<string, any>[];
  }

  interface AuthorRetrieveResponse<AuthorSlug extends string = string>
    extends Response {
    data: {
      data: Author<AuthorSlug>;
    };
  }

  interface AuthorListResponse extends Response {
    data: {
      data: Author[];
    };
  }

  interface AuthorMethods {
    retrieve<AuthorSlug extends string = string>(
      slug: string,
      params?: AuthorParams
    ): Promise<AuthorRetrieveResponse<AuthorSlug>>;

    list(params?: AuthorParams): Promise<AuthorListResponse>;
  }

  interface FeedMethods {
    retrieve(slug: string, params?: any): Promise<Response>;
  }

  //////////
  // Page //
  //////////

  interface PageRetrieveParams {
    preview?: 0 | 1;
    levels?: number;
  }

  type PageListParams<PageModel extends object = object> =
    WithFieldsPrefix<PageModel> & {
      preview?: 0 | 1;
      levels?: number;
      order?: `${"-" | ""}${"published" | "updated"}`;
      page?: number;
      page_size?: number;
    };

  interface PageSearchParams<PageType extends string = string> {
    page_type?: PageType;
    locale?: string;
    levels?: number;
    page?: number;
    page_size?: number;
  }

  interface Page<
    PageModel extends object = object,
    PageType extends string = string,
    PageSlug extends string = string
  > {
    page_type: PageType;
    slug: PageSlug;
    name: string;
    published: Date;
    updated: Date;
    fields: PageModel;
  }

  interface PageRetrieveResponse<
    PageModel extends object = object,
    PageType extends string = string,
    PageSlug extends string = string
  > extends Response {
    data: {
      data: Page<PageModel, PageType, PageSlug>;
    };
  }

  interface PageListResponse<
    PageModel extends object = object,
    PageType extends string = string
  > extends Response {
    data: {
      meta: Meta;
      data: Page<PageModel, PageType>[];
    };
  }

  interface PageSearchResponse<
    PageModel extends object = object,
    PageType extends string = string
  > extends Response {
    data: {
      meta: Meta;
      data: Page<PageModel, PageType>[];
    };
  }

  interface PageMethods {
    retrieve<
      PageModel extends object = object,
      PageType extends string = string,
      PageSlug extends string = string
    >(
      page_type: PageType,
      page_slug: PageSlug,
      params?: PageRetrieveParams
    ): Promise<PageRetrieveResponse<PageModel, PageType, PageSlug>>;

    list<PageModel extends object = object, PageType extends string = string>(
      page_type: PageType,
      params?: PageListParams
    ): Promise<PageListResponse<PageModel, PageType>>;

    search<PageModel extends object = object, PageType extends string = string>(
      query: string,
      params?: PageSearchParams<PageType>
    ): Promise<PageSearchResponse<PageModel, PageType>>;
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
