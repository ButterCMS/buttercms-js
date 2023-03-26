export type Hook = (url: string, params: Record<string, unknown> | undefined, responseJson?: JSON) => Promise<unknown>;

export interface GlobalButterConfig {
  retries?: number,
  headers?: HeadersInit,
  beforeHook?: Hook,
  afterHook?: Hook,
}
