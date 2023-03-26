import { Resource_Post } from '../../lib/resources/Posts'
import { APIWrapper } from '../../lib/utilities/apiWrapper'
import { BUTTER_BASE_API_URL } from '../../lib/config'

import fetchMock from 'jest-fetch-mock'

/* setup base API/resource */
const api = new APIWrapper('123', false, 2500, {})
const resource = new Resource_Post(api)

const expectedParams = '?auth_token=123&preview=0'

const pageType = 'some-page-type'

describe('Post Resource', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponse(JSON.stringify({}));
  })

  test('has expected methods', () => {
    expect(typeof resource.list).toBe('function')
    expect(typeof resource.retrieve).toBe('function')
  })

  test('post.list(): called with correct URL', async () => {
    await resource.list()
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/posts${expectedParams}`, expect.any(Object))
  })
  test('post.list(): called with correct URL - include params', async () => {
    await resource.list({ page: 1, page_size: 1, preview: 0, author_slug: 'author', category_slug: 'category', exclude_body: true, tag_slug: 'tag' })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/posts${expectedParams}&page=1&page_size=1&author_slug=author&category_slug=category&exclude_body=true&tag_slug=tag`, expect.any(Object))
  })

  test('post.retrieve(): called with correct URL', async () => {
    await resource.retrieve('some-post')
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/posts/some-post${expectedParams}`, expect.any(Object))
  })

  test('post.search(): called with correct URL', async () => {
    await resource.search('search-query')
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/posts/search${expectedParams}&query=search-query`, expect.any(Object))
  })
  test('post.search(): called with correct URL - include params', async () => {
    await resource.search('search-query', { page: 1, page_size: 1 })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/posts/search${expectedParams}&page=1&page_size=1&query=search-query`, expect.any(Object))
  })
})