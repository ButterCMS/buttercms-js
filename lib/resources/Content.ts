import type { APIWrapper } from "../utilities/api"

import type {
  FlattenContentModels,
  ContentModelTopLevelValues,
  ContentParams,
  ContentResponse
} from '../butter.d'

export class Resource_Content {
  api: APIWrapper

  constructor (api: APIWrapper) {
    this.api = api
  }

  async retrieve <ContentModels extends object = object> (keys: Array<keyof ContentModels>, params?: ContentParams<FlattenContentModels<ContentModelTopLevelValues<ContentModels>>>) {
    return this.api.get<ContentResponse<ContentModels>>('content', { ...keys, ...params })
  }
}