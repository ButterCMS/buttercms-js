import fetch from './fetch'

import { BUTTER_BASE_API_URL, BUTTER_BASE_HEADERS } from '../config'
import type { GlobalButterConfig } from '../types/GlobalButterConfig'

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
  mergeParams (_params?: Record<string, any>) {
    const params = {
      auth_token: this.#token,
      preview: this.#previewMode ? '1' : '0',
      ..._params,
    }

    // convert true/false preview param to '1' / '0'
    if (_params?.preview === true || _params?.preview === false) {
      params.preview = _params.preview ? '1' : '0'
    }

    return params
  }
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  createURL(base: string, path: string, params?: Record<string, any>) {
    let url = `${base}/${path}`
    
    // if there is params, format them and append to url
    if (params) {
      // add param ?
      url = `${url}?`
      // add each param to the string
      for (let param in params) {
        // check param is defined and is not empty string
        if (typeof params[param] !== 'undefined' && params[param] !== '') {
          url = `${url}${param}=${params[param]}&`
        }
      }
      // remove trailing &
      url = url.slice(0, -1)
    }

    return url
  }

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  async get<T extends string | object> (url: string, params?: Record<string, any>): Promise<T> {
    const butterUrl = this.createURL(this.#baseURL, url, this.mergeParams(params))

    if (typeof this.#config.beforeHook !== 'undefined') {
      await this.#config.beforeHook(butterUrl, params)
    }

    const response = await fetch(butterUrl, {
      headers: { ...BUTTER_BASE_HEADERS, ...this.#config.headers }
    }, this.#config.retries)

    try {
      const json = await response.json()

      if (typeof this.#config.afterHook !== 'undefined') {
        await this.#config.afterHook(butterUrl, params, json)
      }

      return json
    } catch (e) {
      throw `ButterCMS: Api Error, Status: ${response.status}`
    }
  }
}
