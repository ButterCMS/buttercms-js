export type Hook = (url: string, params: Record<string, unknown> | undefined, responseJson?: string|object) => Promise<unknown>;

export interface GlobalButterConfig {
  retries?: number,
  headers?: HeadersInit,
  beforeHook?: Hook,
  afterHook?: Hook,
}
