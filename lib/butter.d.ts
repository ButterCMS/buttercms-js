import { AxiosInstance } from "axios";

////////////////////////////
// Internal utility types //
////////////////////////////

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

// Creates a type where the ContentModel keys are also prefixed with "-" for a decreasing order
type OrderParam<ContentModel extends object> = {
  [Key in keyof ContentModel as Key extends string
    ? `${"-" | ""}${Key}`
    : never]: ContentModel[Key];
};

type ContentArrays<ContentModels extends object> = {
  [Key in keyof ContentModels as Key extends string ? Key : never]: Array<
    ContentModels[Key] & { meta: { id: number } }
  >;
};

type ContentModelTopLevelValues<T extends object = object> =
  T[keyof T] extends object ? T[keyof T] : never;

type FlattenContentModels<U extends object> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I extends object) => void
  ? I
  : never;

export namespace Butter {
  ///////////////////
  // Utility types //
  ///////////////////

  interface Meta {
    next_page: number | null;
    previous_page: number | null;
    count: number;
  }

  interface Response<Data extends object | string = any> {
    data?: Data;
    status?: number;
    statusText?: string;
    headers?: Record<string, any>;
    config?: Record<string, any>;
  }

  //////////
  // Post //
  //////////

  interface PostRetrieveParams {
    preview?: 1 | 0;
  }

  interface PostListParams<AuthorSlug extends string = string> {
    preview?: 1 | 0;
    exclude_body?: boolean;
    page?: number;
    page_size?: number;
    author_slug?: AuthorSlug;
    category_slug?: string;
    tag_slug?: string;
  }

  interface PostSearchParams {
    page?: number;
    page_size?: number;
  }

  interface Post<
    AuthorSlug extends string = string,
    PostSlug extends string = string
  > {
    status: "published" | "draft";
    created: Date;
    updated: Date;
    published: Date;
    title: string;
    slug: PostSlug;
    summary: string;
    seo_title: string;
    meta_description: string;
    featured_image: string;
    featured_image_alt: string;
    url: string;
    author: Omit<Author<AuthorSlug>, "recent_posts">;
    tags: Tag[];
    categories: Category[];
    body?: string;
  }

  interface PostRetrieveResponse<
    AuthorSlug extends string = string,
    PostSlug extends string = string
  > {
    data: Post<AuthorSlug, PostSlug>;
  }

  interface PostListResponse<
    AuthorSlug extends string = string,
    PostSlug extends string = string
  > {
    meta: Meta;
    data: Post<AuthorSlug, PostSlug>[];
  }

  interface PostSearchResponse {
    meta: Meta;
    data: Post[];
  }

  interface PostMethods {
    /**
     * Retrieve a post
     * @param slug The post's slug
     * @param params Optional params
     * @example
     * retrieve<'how-to-use-butter'>('how-to-use-butter')
     */
    retrieve<PostSlug extends string = string>(
      slug: PostSlug,
      params?: PostRetrieveParams
    ): Promise<Response<PostRetrieveResponse<string, PostSlug>>>;

    /**
     * Get a list of posts
     * @param params Optional params
     * @example
     * list()
     */
    list<AuthorSlug extends string = string>(
      params?: PostListParams<AuthorSlug>
    ): Promise<Response<PostListResponse<AuthorSlug>>>;

    /**
     * Search posts based on a query
     * @param query The query
     * @param params Optional params
     * @example
     * search('my query')
     */
    search(
      query: string,
      params?: PostSearchParams
    ): Promise<Response<PostSearchResponse>>;
  }

  //////////////
  // Category //
  //////////////

  interface CategoryParams {
    /**
     * Get 10 most recent posts of this category
     */
    include?: "recent_posts";
  }

  interface Category<CategorySlug extends string = string> {
    name: string;
    slug: CategorySlug;
    recent_posts?: Post[];
  }

  interface CategoryRetrieveResponse<CategorySlug extends string = string> {
    data: Category<CategorySlug>;
  }

  interface CategoryListResponse {
    data: Category[];
  }

  interface CategoryMethods {
    /**
     * Retrieve a category
     * @param slug The category's slug
     * @param params Optional params
     * @example
     * retrieve<'some-category'>('some-category')
     */
    retrieve<CategorySlug extends string = string>(
      slug: CategorySlug,
      params?: CategoryParams
    ): Promise<Response<CategoryRetrieveResponse<CategorySlug>>>;

    /**
     * Get all categories
     * @param params Optional params
     * @example
     * list()
     */
    list(params?: CategoryParams): Promise<Response<CategoryListResponse>>;
  }

  /////////
  // Tag //
  /////////

  interface TagParams {
    /**
     * Get 10 most recent posts of this tag
     */
    include?: "recent_posts";
  }

  interface Tag<TagSlug extends string = string> {
    name: string;
    slug: TagSlug;
    recent_posts?: Post[];
  }

  interface TagRetrieveResponse<TagSlug extends string = string> {
    data: Tag<TagSlug>;
  }

  interface TagListResponse {
    data: Tag[];
  }

  interface TagMethods {
    /**
     * Retrieve a tag
     * @param slug The tag's slug
     * @param params Optional params
     * @example
     * retrieve<'some-tag'>('some-tag')
     */
    retrieve<TagSlug extends string = string>(
      slug: TagSlug,
      params?: TagParams
    ): Promise<Response<TagRetrieveResponse<TagSlug>>>;

    /**
     * Get all tags
     * @param params Optional params
     * @example
     * list()
     */
    list(params?: TagParams): Promise<Response<TagListResponse>>;
  }

  ////////////
  // Author //
  ////////////

  interface AuthorParams {
    /**
     * Get 10 most recent posts by the author
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
    linkedin_url: string;
    facebook_url: string;
    pinterest_url: string;
    instagram_url: string;
    twitter_handle: string;
    profile_image: string;
    recent_posts?: Post[];
  }

  interface AuthorRetrieveResponse<AuthorSlug extends string = string> {
    data: Author<AuthorSlug>;
  }

  interface AuthorListResponse {
    data: Author[];
  }

  interface AuthorMethods {
    /**
     * Retrieve an author
     * @param slug The author's slug
     * @param params Optional params
     * @example
     * retrieve<'joe-bloggs'>('joe-bloggs')
     */
    retrieve<AuthorSlug extends string = string>(
      slug: string,
      params?: AuthorParams
    ): Promise<Response<AuthorRetrieveResponse<AuthorSlug>>>;

    /**
     * Get a list of authors
     * @param params Optional params
     * @example
     * list()
     */
    list(params?: AuthorParams): Promise<Response<AuthorListResponse>>;
  }

  //////////
  // Feed //
  //////////

  type FeedTypes = "atom" | "rss" | "sitemap";

  interface FeedParams {
    category_slug?: string;
    tag_slug?: string;
  }

  interface FeedMethods {
    /**
     * Get a feed
     * @param feedType The type of feed
     * @param params Optional params
     * @example
     * retrieve('atom')
     * retrieve('rss')
     * retrieve('sitemap')
     */
    retrieve(
      feedType: FeedTypes,
      params?: FeedParams
    ): Promise<Response<string>>;
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
  > {
    data: Page<PageModel, PageType, PageSlug>;
  }

  interface PageListResponse<
    PageModel extends object = object,
    PageType extends string = string
  > {
    meta: Meta;
    data: Page<PageModel, PageType>[];
  }

  interface PageSearchResponse<
    PageModel extends object = object,
    PageType extends string = string
  > {
    meta: Meta;
    data: Page<PageModel, PageType>[];
  }

  interface PageMethods {
    /**
     * Retrieve a single page
     * @param page_type The page type
     * @param page_slug The page slug
     * @param params Optional params
     * @example
     * interface LandingPage { ... }
     * retrieve<LandingPage, 'landing_page', 'our_services'>('landing_page', 'our_services')
     */
    retrieve<
      PageModel extends object = object,
      PageType extends string = string,
      PageSlug extends string = string
    >(
      page_type: PageType,
      page_slug: PageSlug,
      params?: PageRetrieveParams
    ): Promise<Response<PageRetrieveResponse<PageModel, PageType, PageSlug>>>;

    /**
     * Get multiple pages of the same page type
     * @param page_type The page type
     * @param params Optional params
     * @example
     * interface LandingPage { ... }
     * list<LandingPage, 'landing_page'>('landing_page')
     */
    list<PageModel extends object = object, PageType extends string = string>(
      page_type: PageType,
      params?: PageListParams
    ): Promise<Response<PageListResponse<PageModel, PageType>>>;

    /**
     * Search pages based on a query
     * @param query The query
     * @param params Optional params
     * @example
     * // Generic search
     * search('my query')
     *
     * // Search all pages of the same page type
     * interface LandingPage { ... }
     * search<LandingPage, 'landing_page'>('my query', { page_type: 'landing_type' })
     */
    search<PageModel extends object = object, PageType extends string = string>(
      query: string,
      params?: PageSearchParams<PageType>
    ): Promise<Response<PageSearchResponse<PageModel, PageType>>>;
  }

  /////////////
  // Content //
  /////////////

  type ContentParams<ContentModel extends object = object> =
    WithFieldsPrefix<ContentModel> & {
      test?: 0 | 1;
      order?: keyof OrderParam<ContentModel>;
      page?: number;
      page_size?: number;
      levels?: number;
    };

  interface ContentResponse<ContentModels extends object = object> {
    meta: Meta;
    data: ContentArrays<ContentModels>;
  }

  interface ContentMethods {
    /**
     * Retrieve content
     * @param keys An array of the keys of the content to retrieve
     * @param params Optional params
     * @example
     * interface Content1 { ... }
     * interface Content2 { ... }
     * retrieve<{ key1: Content1, key2: Content2 }>(['key1', 'key2'])
     */
    retrieve<ContentModels extends object = object>(
      keys: Array<keyof ContentModels>,
      params?: ContentParams<
        FlattenContentModels<ContentModelTopLevelValues<ContentModels>>
      >
    ): Promise<Response<ContentResponse<ContentModels>>>;
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
