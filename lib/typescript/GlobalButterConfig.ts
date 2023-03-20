// rome-ignore lint/suspicious/noExplicitAny: <explanation>
type Hook = (url: string, params: Record<string, any> | undefined, responseJson?: JSON) => Promise<unknown>;

export interface GlobalButterConfig {
  retries?: number,
  headers?: HeadersInit,
  beforeHook?: Hook,
  afterHook?: Hook,
}