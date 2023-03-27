import fetch from 'isomorphic-unfetch'

export default async function fetchRetry (url: string, requestConfig: RequestInit, retries = 1): Promise<Response> {
  const response = await fetch(url, requestConfig)
  if (response.ok) {
    return response
  }

  if (retries > 0) {
    return fetchRetry(url, requestConfig, retries - 1)
  }

  return response
}
