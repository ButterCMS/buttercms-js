import { Resource_Tag } from '../../lib/resources/Tag'
import { APIWrapper } from '../../lib/utilities/apiWrapper'
import { BUTTER_BASE_API_URL } from '../../lib/config'

import fetchMock from 'jest-fetch-mock'

/* setup base API/resource */
const api = new APIWrapper('123', false, 2500, {})
const resource = new Resource_Tag(api)

const expectedParams = '?auth_token=123&preview=0'

describe('Tag Resource', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponse(JSON.stringify({}));
  })

  test('has expected methods', () => {
    expect(typeof resource.list).toBe('function')
    expect(typeof resource.retrieve).toBe('function')
  })

  test('tag.list(): called with correct URL', async () => {
    await resource.list()
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/tags${expectedParams}`, expect.any(Object))
  })
  test('tag.list(): called with correct URL - include recent posts', async () => {
    await resource.list({ include: 'recent_posts' })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/tags${expectedParams}&include=recent_posts`, expect.any(Object))
  })

  test('tag.retrieve(): called with correct URL', async () => {
    await resource.retrieve('some-tag')
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/tags/some-tag${expectedParams}`, expect.any(Object))
  })
  test('tag.retrieve(): called with correct URL - include recent posts', async () => {
    await resource.retrieve('some-tag', { include: 'recent_posts' })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/tags/some-tag${expectedParams}&include=recent_posts`, expect.any(Object))
  })
})