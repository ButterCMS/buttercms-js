import { Resource_Page } from '../../lib/resources/Page'
import { APIWrapper } from '../../lib/utilities/apiWrapper'
import { BUTTER_BASE_API_URL } from '../../lib/config'

import fetchMock from 'jest-fetch-mock'

/* setup base API/resource */
const api = new APIWrapper('123', false, 2500, {})
const resource = new Resource_Page(api)

const expectedParams = '?auth_token=123&preview=0'

const pageType = 'some-page-type'

describe('Page Resource', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponse(JSON.stringify({}));
  })

  test('has expected methods', () => {
    expect(typeof resource.list).toBe('function')
    expect(typeof resource.retrieve).toBe('function')
  })

  test('page.list(): called with correct URL', async () => {
    await resource.list(pageType)
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/pages/${pageType}${expectedParams}`, expect.any(Object))
  })
  test('page.list(): called with correct URL - include params', async () => {
    await resource.list(pageType, { levels: 1, order: '-published', page: 1, page_size: 1, preview: 0 })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/pages/${pageType}${expectedParams}&levels=1&order=-published&page=1&page_size=1`, expect.any(Object))
  })

  test('page.retrieve(): called with correct URL', async () => {
    await resource.retrieve(pageType, 'test-slug')
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/pages/${pageType}/test-slug${expectedParams}`, expect.any(Object))
  })
  test('page.retrieve(): called with correct URL - include params', async () => {
    await resource.retrieve(pageType, 'test-slug', { levels: 1, preview: 0 })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/pages/${pageType}/test-slug${expectedParams}&levels=1`, expect.any(Object))
  })

  test('page.search(): called with correct URL', async () => {
    await resource.search('search-query')
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/pages/search${expectedParams}&query=search-query`, expect.any(Object))
  })
  test('page.search(): called with correct URL - include params', async () => {
    await resource.search('search-query', { levels: 1, page: 1, page_size: 1, page_type: pageType, locale: 'en', })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/pages/search${expectedParams}&levels=1&page=1&page_size=1&page_type=some-page-type&locale=en&query=search-query`, expect.any(Object))
  })
})