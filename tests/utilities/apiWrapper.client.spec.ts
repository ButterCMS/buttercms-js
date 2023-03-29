/**
 * @jest-environment @happy-dom/jest-environment
 */
import { APIWrapper } from '../../lib/utilities/apiWrapper'
import { BUTTER_BASE_API_URL, BUTTER_BASE_HEADERS } from '../../lib/config'

import fetchMock from 'jest-fetch-mock'

// @ts-ignore
import { AbortController } from "abortcontroller-polyfill/dist/cjs-ponyfill";
// @ts-ignore
global.AbortController = AbortController;

const config = { 
  retries: 0,
  headers: { 'SOME-HEADER': 'true' },
  beforeHook: async () => Promise.resolve(() => console.log('beforeHook')),
  afterHook: async () => Promise.resolve(() => console.log('afterHook'))
}

describe('APIWrapper: Client', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('get()', () => {
    test('calls expected URL with expected fetch config', async () => {
      fetchMock.mockResponse(JSON.stringify({}));
  
      const api = new APIWrapper('123', false, 2500, config)
  
      await api.get('test-path')
  
      expect(fetchMock).toHaveBeenCalledWith(`${BUTTER_BASE_API_URL}/test-path?auth_token=123&preview=0`, {
        headers: {
          ...BUTTER_BASE_HEADERS,
          ...config.headers
        },
        // TODO: Review happy-dom support for AbortController
        // and remove polyfill / improve test expectation
        signal: expect.any(Object)
      })
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })
  
    test('returns json', async () => {
      fetchMock.mockResponse(JSON.stringify({ hello: 'world' }));
  
      const api = new APIWrapper('123', false, 2500, config)
  
      const response = await api.get('test-path')
  
      expect(response).toMatchObject({ hello: 'world' })
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })
    describe('error handling', () => {
      test('fetch server error', async () => {
        fetchMock.mockResponse('fail', {
          status: 500
        });
    
        const api = new APIWrapper('123', false, 2500, config)
        
        await expect(async () => api.get('test-path')).rejects.toThrowError('ButterCMS: Api Error, Status: INTERNAL SERVER ERROR')
  
        expect(fetchMock).toHaveBeenCalledTimes(1)
      })
  
      test('fetch timeout error', async () => {
        // mock a response taking 1s (longer than timeout setting) - expect failure 
        fetchMock.mockResponse(() => new Promise(resolve => setTimeout(() => resolve({ 
          body: 'ok'
        }), 500)));
    
        const api = new APIWrapper('123', false, 100, config)
  
        await expect(async () => api.get('test-path')).rejects.toThrowError('ButterCMS: Api Error, Status: TIMEOUT')
  
        expect(fetchMock).toHaveBeenCalledTimes(1)
      })

      test('after hook not called on error', async () => {
        const afterHook = jest.spyOn(config, 'afterHook')
  
        fetchMock.mockResponse('fail', {
          status: 500
        });
    
        const api = new APIWrapper('123', false, 2500, config)
    
        await expect(async () => api.get('test-path'))
    
        expect(afterHook).toHaveBeenCalledTimes(0)
  
        jest.restoreAllMocks()
      })
    })
  })
}) 