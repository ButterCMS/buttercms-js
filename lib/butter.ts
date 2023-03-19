import type {
  PostMethods,
  PostListParams,
  PostListResponse,
  PostRetrieveParams,
  PostRetrieveResponse,
  PostSearchParams,
  PostSearchResponse,
  CategoryMethods
} from './butter.d'

import { API } from './utilities/api'

import type { GlobalConfig } from './typescript/GlobalApiConfig'

export default class Butter {
  #apiToken: string;
  #testMode: boolean;
  #timeout: number;
  #globalConfig: GlobalConfig
  // resource APIs
  post: PostMethods
  category: CategoryMethods
  tag: unknown
  author: unknown
  feed: unknown
  content: unknown
  page: unknown

  constructor  (
    apiToken: string,
    testMode: boolean = false,
    timeout: number = 3000,
    globalConfig: GlobalConfig = { 
      retries: 0
    }
  ) {
    /* if no apiToken is passed throw error */
    if (typeof apiToken !== 'string') {
      throw 'ButterCMS API token not set';
    }

    this.#apiToken = apiToken
    this.#testMode = testMode
    this.#timeout = timeout
    this.#globalConfig = globalConfig

    this.post = {
      list: async <AuthorSlug extends string = string>(
        params?: PostListParams<AuthorSlug>
      ) => await new API('posts', this.#apiToken, this.#testMode, this.#timeout, this.#globalConfig).get<PostListResponse<AuthorSlug>>('', params),

      retrieve: async <PostSlug extends string = string>(
        slug: PostSlug,
        params?: PostRetrieveParams
      ) => await new API('posts', this.#apiToken, this.#testMode, this.#timeout, this.#globalConfig).get<PostRetrieveResponse<string, PostSlug>>(slug, params),

      search: async (
        query: string,
        params?: PostSearchParams
      ) => await new API('posts/search', this.#apiToken, this.#testMode, this.#timeout, this.#globalConfig).get<PostSearchResponse>(query, params)
    }
  }
}
