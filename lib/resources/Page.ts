import type { APIWrapper } from "../utilities/apiWrapper"

import type {
  PageListParams,
  PageListResponse,
  PageRetrieveParams,
  PageRetrieveResponse,
  PageSearchParams,
  PageSearchResponse
} from '../types/Butter'

export class Resource_Page {
  api: APIWrapper

  constructor (api: APIWrapper) {
    this.api = api
  }

  async list <PageModel extends object = object, PageType extends string = string> (
    page_type: PageType,
    params?: PageListParams
  ) {
    return this.api.get<PageListResponse<PageModel, PageType>>(`pages/${page_type}`, params)
  }

  async retrieve <
    PageModel extends object = object,
    PageType extends string = string,
    PageSlug extends string = string
  > (
    page_type: PageType,
    page_slug: PageSlug,
    params?: PageRetrieveParams
  ) {
    return this.api.get<PageRetrieveResponse<PageModel, PageType, PageSlug>>(`pages/${page_type}/${page_slug}`, params)
  }

  async search <PageModel extends object = object, PageType extends string = string> (query: string, params?: PageSearchParams<PageType>) {
    return this.api.get<PageSearchResponse<PageModel, PageType>>('pages/search', { ...params, query })
  }
}
