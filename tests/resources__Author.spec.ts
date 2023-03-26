import { Resource_Author } from '../lib/resources/Author'
import { APIWrapper } from '../lib/utilities/apiWrapper'
import { BUTTER_BASE_API_URL } from '../lib/config'

import fetchMock from 'jest-fetch-mock'

/* setup base API/resource */
const api = new APIWrapper('123', false, 2500, {})
const resource = new Resource_Author(api)

const expectedParams = '?auth_token=123&preview=0'

describe('Author Resource', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponse(JSON.stringify({}));
  })

  test('has expected methods', () => {
    expect(typeof resource.list).toBe('function')
    expect(typeof resource.retrieve).toBe('function')
  })

  test('author.list(): called with correct URL', async () => {
    await resource.list()
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/authors${expectedParams}`, expect.any(Object))
  })
  test('author.list(): called with correct URL - include recent posts', async () => {
    await resource.list({ include: 'recent_posts' })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/authors${expectedParams}&include=recent_posts`, expect.any(Object))
  })

  test('author.retrieve(): called with correct URL', async () => {
    await resource.retrieve('some-author')
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/authors/some-author${expectedParams}`, expect.any(Object))
  })
  test('author.retrieve(): called with correct URL - include recent posts', async () => {
    await resource.retrieve('some-author', { include: 'recent_posts' })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/authors/some-author${expectedParams}&include=recent_posts`, expect.any(Object))
  })
})