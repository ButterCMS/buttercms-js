import { Resource_Content } from '../../lib/resources/Content'
import { APIWrapper } from '../../lib/utilities/apiWrapper'
import { BUTTER_BASE_API_URL } from '../../lib/config'

import fetchMock from 'jest-fetch-mock'

/* setup base API/resource */
const api = new APIWrapper('123', false, 2500, {})
const resource = new Resource_Content(api)

const expectedParams = '?auth_token=123&preview=0'

interface demoContent {
  artists: string
}

describe('Content Resource', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponse(JSON.stringify({}));
  })

  test('has expected methods', () => {
    expect(typeof resource.retrieve).toBe('function')
  })

  test('content.retrieve(): called with correct URL', async () => {
    await resource.retrieve(['artists'])
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/content${expectedParams}&keys=artists`, expect.any(Object))
  })
  test('content.retrieve(): called with correct URL - mutliple content keys', async () => {
    await resource.retrieve(['artists', 'genres'])
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/content${expectedParams}&keys=artists,genres`, expect.any(Object))
  })
  
  /*
  ! TypeError: TS2589: Type instantiation is excessively deep and possibly infinite.
  test('content.retrieve(): called with correct URL - with params', async () => {
    await resource.retrieve(['artists'], { levels: 1, order: '-published', page: 1, page_size: 1, preview: 0, 'fields.genre': 'rock' })
    expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/content/artists${expectedParams}&levels=1&order=-published&page=1&page_size=1&fields.genre=rock`, expect.any(Object))
  })
  */
})