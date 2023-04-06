import fetch from 'isomorphic-unfetch'

export default async function fetchRetry<T extends string|object> (url: string, requestConfig: RequestInit, retries = 1): Promise<T|Error> {
  const response = await fetch(url, requestConfig)
  if (response.ok) {
    return response.json()
  }

  if (retries > 0) {
    return fetchRetry(url, requestConfig, retries - 1)
  }

  throw new Error(response.statusText)
}
