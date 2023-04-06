import type { APIWrapper } from "../utilities/apiWrapper"

import type {
  FeedParams,
  FeedTypes
} from '../types/Butter'

export class Resource_Feed {
  api: APIWrapper

  constructor (api: APIWrapper) {
    this.api = api
  }

  async retrieve (type: FeedTypes, params?: FeedParams) {
    return this.api.get<string>(`feeds/${type}`, params)
  }
}
