import { APIWrapper } from '../../lib/utilities/apiWrapper'
import { BUTTER_BASE_API_URL, BUTTER_BASE_HEADERS } from '../../lib/config'

import fetchMock from 'jest-fetch-mock'

const config = { 
  retries: 0,
  headers: { 'SOME-HEADER': 'true' },
  beforeHook: async () => Promise.resolve(() => console.log('beforeHook')),
  afterHook: async () => Promise.resolve(() => console.log('afterHook'))
}

describe('APIWrapper', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('createParams(): preview mode - true', () => {
    const api = new APIWrapper('123', true, 2500, config)
    expect(api.createParams()).toEqual({ auth_token: "123", preview: "1" })
  })
  test('createParams(): preview mode - false', () => {
    const api = new APIWrapper('123', false, 2500, config)
    expect(api.createParams()).toMatchObject({ auth_token: "123", preview: "0" })
  })
  test('createParams(): custom params', () => {
    const api = new APIWrapper('123', false, 2500, config)
    const customParam = { custom: true }
    expect(api.createParams(customParam)).toMatchObject({ auth_token: "123", preview: "0", custom: true })
  })
  test('createParams(): custom preview params will overwrite default preview mode', () => {
    const api = new APIWrapper('123', false, 2500, config)
    const customParam = { preview: true }
    expect(api.createParams(customParam)).toMatchObject({ auth_token: "123", preview: "1" })
  })

  test('createUrl(): builds url without params', () => {
    const api = new APIWrapper('123', false, 2500, config)
    const customParam = { preview: true }
    expect(api.createURL('https://example.com', 'some-path')).toEqual('https://example.com/some-path')
  })
  test('createUrl(): builds url with params', () => {
    const api = new APIWrapper('123', false, 2500, config)
    const customParam = { preview: true, something: 'else' }
    expect(api.createURL('https://example.com', 'some-path', customParam)).toEqual('https://example.com/some-path?preview=true&something=else')
  })

  test('get() - calls expected URL with expected HEADERS', async () => {
    fetchMock.mockResponse(JSON.stringify({}));

    const api = new APIWrapper('123', false, 2500, config)

    await api.get('test-path')

    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/test-path?auth_token=123&preview=0`, {
      headers: {
        ...BUTTER_BASE_HEADERS,
        ...config.headers
      }
    })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  test('get() - returns json', async () => {
    fetchMock.mockResponse(JSON.stringify({ hello: 'world' }));

    const api = new APIWrapper('123', false, 2500, config)

    const response = await api.get('test-path')

    expect(response).toMatchObject({ hello: 'world' })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
}) 