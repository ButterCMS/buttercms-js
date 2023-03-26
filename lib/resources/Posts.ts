import type { APIWrapper } from "../utilities/apiWrapper"

import type {
  PostListParams,
  PostListResponse,
  PostRetrieveParams,
  PostRetrieveResponse,
  PostSearchParams,
  PostSearchResponse,
} from '../butter.d'

export class Resource_Post {
  api: APIWrapper

  constructor (api: APIWrapper) {
    this.api = api
  }

  async list <AuthorSlug extends string = string> (params?: PostListParams<AuthorSlug>) {
    return this.api.get<PostListResponse<AuthorSlug>>('posts', params)
  }

  async retrieve <PostSlug extends string = string> (slug: PostSlug, params?: PostRetrieveParams) {
    return this.api.get<PostRetrieveResponse<string, PostSlug>>(`posts/${slug}`, params)
  }

  async search (query: string, params?: PostSearchParams) {
    return this.api.get<PostSearchResponse>('posts/search', { ...params, query })
  }
}
