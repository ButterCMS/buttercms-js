import type { GlobalConfig } from '../typescript/GlobalApiConfig'

export class Base {
  #apiToken: string;
  #testMode: boolean;
  #timeout: number;
  #globalConfig: GlobalConfig

  constructor  (
    apiToken: string,
    testMode: boolean = false,
    timeout: number = 3000,
    globalConfig: GlobalConfig = { 
      retries: 0
    }
  ) {
    this.#apiToken = apiToken
    this.#testMode = testMode
    this.#timeout = timeout
    this.#globalConfig = globalConfig
  }
}