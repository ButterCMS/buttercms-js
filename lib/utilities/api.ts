
import { BUTTER_BASE_API_URL, BUTTER_BASE_HEADERS } from '../config'
import type { GlobalConfig } from '../typescript/GlobalApiConfig'

export class API {
  #apiToken: string;
  #testMode: boolean;
  #timeout: number;
  #config: GlobalConfig
  #baseURL = BUTTER_BASE_API_URL;
  #apiEndpoint: string;

  constructor (resourceEndpoint: string, apiToken: string, testMode: boolean = false, timeout: number = 3000, config: GlobalConfig) {
    this.#apiToken = apiToken
    this.#testMode = testMode
    this.#timeout = timeout

    this.#apiEndpoint = `${this.#baseURL}/${resourceEndpoint}`
    this.#config = config
  }

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  createParams (_params?: Record<string, any>) {
    const params = {
      ..._params,
      auth_token: this.#apiToken,
      test: this.#testMode ? '1' : '0',
      preview: this.#testMode ? '1' : '0'
    }
    return new URLSearchParams(params).toString();
  }

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  async get<T extends string | object> (url: string, params?: Record<string, any>): Promise<T> {
    const response = await fetch(`${this.#apiEndpoint}${url}?${this.createParams(params)}`, {
      headers: BUTTER_BASE_HEADERS
    })

    return response.json()
  } 
}