
import fetch from './retry'

import { BUTTER_BASE_API_URL, BUTTER_BASE_HEADERS } from '../config'
import type { GlobalButterConfig } from '../typescript/GlobalButterConfig'

export class APIWrapper {
  #token: string;
  #testMode: boolean;
  #timeout: number;
  #config: GlobalButterConfig
  #baseURL = BUTTER_BASE_API_URL;

  constructor (token: string, testMode: boolean = false, timeout: number = 3000, config: GlobalButterConfig) {
    this.#token = token
    this.#testMode = testMode
    this.#timeout = timeout
    this.#config = config
  }

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  createParams (_params?: Record<string, any>) {
    const params = {
      ..._params,
      auth_token: this.#token,
      test: this.#testMode ? '1' : '0',
      preview: this.#testMode ? '1' : '0'
    }

    return new URLSearchParams(params).toString();
  }

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  async get<T extends string | object> (url: string, params?: Record<string, any>): Promise<T> {
    const butterUrl = `${this.#baseURL}/${url}?${this.createParams(params)}`

    if (typeof this.#config.beforeHook !== 'undefined') {
      await this.#config.beforeHook(butterUrl, params)
    }

    const response = await fetch(butterUrl, {
      headers: { ...BUTTER_BASE_HEADERS, ...this.#config.headers }
    }, this.#config.retries)

    const json = await response.json()

    if (typeof this.#config.afterHook !== 'undefined') {
      await this.#config.afterHook(url, params, json)
    }

    return json
  }
}
