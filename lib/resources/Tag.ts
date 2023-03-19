import type { APIWrapper } from "../utilities/api"

import type {
  TagListResponse,
  TagParams,
  TagRetrieveResponse
} from '../butter.d'

export class Resource_Tag {
  api: APIWrapper

  constructor (api: APIWrapper) {
    this.api = api
  }

  async list(params?: TagParams)  {
    return this.api.get<TagListResponse>('tags', params)
  }

  async retrieve <TagSlug extends string = string> (slug: TagSlug, params?: TagParams) {
    return this.api.get<TagRetrieveResponse<TagSlug>>(`tags/${slug}`, params)
  }
}