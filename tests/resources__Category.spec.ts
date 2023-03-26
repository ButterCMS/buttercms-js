import { Resource_Category } from '../lib/resources/Category'
import { APIWrapper } from '../lib/utilities/apiWrapper'
import { BUTTER_BASE_API_URL } from '../lib/config'

import fetchMock from 'jest-fetch-mock'

/* setup base API/resource */
const api = new APIWrapper('123', false, 2500, {})
const resource = new Resource_Category(api)

const expectedParams = '?auth_token=123&preview=0'

describe('Category Resource', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponse(JSON.stringify({}));
  })

  test('has expected methods', () => {
    expect(typeof resource.list).toBe('function')
    expect(typeof resource.retrieve).toBe('function')
  })

  test('category.list(): called with correct URL', async () => {
    await resource.list()
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/categories${expectedParams}`, expect.any(Object))
  })
  test('category.list(): called with correct URL - include recent posts', async () => {
    await resource.list({ include: 'recent_posts' })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/categories${expectedParams}&include=recent_posts`, expect.any(Object))
  })

  test('category.retrieve(): called with correct URL', async () => {
    await resource.retrieve('some-category')
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/categories/some-category${expectedParams}`, expect.any(Object))
  })
  test('category.retrieve(): called with correct URL - include recent posts', async () => {
    await resource.retrieve('some-category', { include: 'recent_posts' })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/categories/some-category${expectedParams}&include=recent_posts`, expect.any(Object))
  })
})