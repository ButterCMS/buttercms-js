import type { APIWrapper } from "../utilities/apiWrapper"

import type {
  CategoryListResponse,
  CategoryParams,
  CategoryRetrieveResponse
} from '../types/Butter'

export class Resource_Category {
  api: APIWrapper

  constructor (api: APIWrapper) {
    this.api = api
  }

  async list(params?: CategoryParams)  {
    return this.api.get<CategoryListResponse>('categories', params)
  }

  async retrieve <CategorySlug extends string = string> (slug: CategorySlug, params?: CategoryParams) {
    return this.api.get<CategoryRetrieveResponse<CategorySlug>>(`categories/${slug}`, params)
  }
}
