import fetch from 'isomorphic-unfetch'

export default async function fetchRetry (url: string, requestConfig: RequestInit, retries = 1): Promise<Response> {
  const response = await fetch(url, requestConfig)
  if (response?.ok) {
    return response
  }

  if (retries > 0) {
    console.log(`Fetch failed with status ${response?.status}, trying again... (attempts remaining ${retries - 1})`)
    return fetchRetry(url, requestConfig, retries - 1)
  }

  console.log(`Fetch failed with status ${response?.status}, giving up.`)

  return response
}
