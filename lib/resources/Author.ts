import type { APIWrapper } from "../utilities/apiWrapper"

import type {
  AuthorListResponse,
  AuthorParams,
  AuthorRetrieveResponse,
} from '../types/Butter'

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
