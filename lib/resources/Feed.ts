import type { APIWrapper } from "../utilities/api"

import type {
  FeedParams,
  FeedTypes
} from '../butter.d'

export class Resource_Feed {
  api: APIWrapper

  constructor (api: APIWrapper) {
    this.api = api
  }

  async retrieve (type: FeedTypes, params?: FeedParams) {
    return this.api.get<string>(`feeds/${type}`, params)
  }
}