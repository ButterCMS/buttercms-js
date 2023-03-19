import type {
  PostMethods,
  PostListParams,
  PostListResponse,
  PostRetrieveParams,
  PostRetrieveResponse,
  PostSearchParams,
  PostSearchResponse,
  CategoryMethods
} from '../butter.d'

import { API } from '../utilities/api'
import { Base } from '../utilities/shared'
export class Post extends Base {
  url: string = 'posts'

  constructor (url) {
    super()
  
    if (url) {
      this.url = `posts/${url}`
    }
  }

  async list<AuthorSlug extends string = string>(params?: PostListParams<AuthorSlug>) {
    return await new API(this.url, this.#apiToken, this.#testMode, this.#timeout, this.#globalConfig).get<PostListResponse<AuthorSlug>>('', params),
  }
}