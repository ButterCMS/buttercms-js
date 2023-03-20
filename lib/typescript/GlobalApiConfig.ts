type Hook = (url: string, params: Record<string, any> | undefined, responseJson?: JSON) => Promise<unknown>;


export interface GlobalConfig {
  retries?: number,
  headers?: HeadersInit,
  beforeHook?: Hook,
  afterHook?: Hook,
}