
import fetch from './fetch'

import { BUTTER_BASE_API_URL, BUTTER_BASE_HEADERS } from '../config'
import type { GlobalButterConfig } from '../typescript/GlobalButterConfig'

export class APIWrapper {
  #token: string;
  #previewMode: boolean;
  #timeout: number;
  #config: GlobalButterConfig
  #baseURL = BUTTER_BASE_API_URL;

  constructor (token: string, previewMode: boolean = false, timeout: number = 3000, config: GlobalButterConfig) {
    this.#token = token
    this.#previewMode = previewMode
    this.#timeout = timeout
    this.#config = config
  }

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  createParams (_params?: Record<string, any>) {
    const params = {
      auth_token: this.#token,
      preview: this.#previewMode ? '1' : '0',
      ..._params,
    }

    // convert true/false preview param to '1' / '0'
    if (_params?.preview === true || _params?.preview === false) {
      params.preview = _params.preview ? '1' : '0'
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

    const json = await response?.json()

    if (typeof this.#config.afterHook !== 'undefined') {
      await this.#config.afterHook(url, params, json)
    }

    return json
  }
}
