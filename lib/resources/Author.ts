import type { APIWrapper } from "../utilities/api"

import type {
  AuthorListResponse,
  AuthorParams,
  AuthorRetrieveResponse,
} from '../butter.d'

export class Resource_Author {
  api: APIWrapper

  constructor (api: APIWrapper) {
    this.api = api
  }

  async list(params?: AuthorParams)  {
    return this.api.get<AuthorListResponse>('authors', params)
  }

  async retrieve <AuthorSlug extends string = string> (slug: string, params?: AuthorParams) {
    return this.api.get<AuthorRetrieveResponse<AuthorSlug>>(`authors/${slug}`, params)
  }
}