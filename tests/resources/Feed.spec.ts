import { Resource_Feed } from '../../lib/resources/Feed'
import { APIWrapper } from '../../lib/utilities/apiWrapper'
import { BUTTER_BASE_API_URL } from '../../lib/config'

import fetchMock from 'jest-fetch-mock'

/* setup base API/resource */
const api = new APIWrapper('123', false, 2500, {})
const resource = new Resource_Feed(api)

const expectedParams = '?auth_token=123&preview=0'

describe('Feed Resource', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponse(JSON.stringify({}));
  })

  test('has expected methods', () => {
    expect(typeof resource.retrieve).toBe('function')
  })

  test('feed.retrieve(): called with correct URL - atom', async () => {
    await resource.retrieve('atom')
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/feeds/atom${expectedParams}`, expect.any(Object))
  })
  test('feed.retrieve(): called with correct URL - rss', async () => {
    await resource.retrieve('rss')
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/feeds/rss${expectedParams}`, expect.any(Object))
  })
  test('feed.retrieve(): called with correct URL - sitemap', async () => {
    await resource.retrieve('sitemap')
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/feeds/sitemap${expectedParams}`, expect.any(Object))
  })

  test('feed.retrieve(): called with correct URL - with params: include category_slug and tag_slug', async () => {
    await resource.retrieve('rss', { category_slug: 'some-category', tag_slug: 'some-tag' })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/feeds/rss${expectedParams}&category_slug=some-category&tag_slug=some-tag`, expect.any(Object))
  })
})