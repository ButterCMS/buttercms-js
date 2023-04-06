import { APIWrapper } from '../../lib/utilities/apiWrapper'
import { BUTTER_BASE_API_URL, BUTTER_BASE_HEADERS } from '../../lib/config'

import fetchMock from 'jest-fetch-mock'

const config = { 
  retries: 0,
  headers: { 'SOME-HEADER': 'true' },
  beforeHook: async () => Promise.resolve(() => console.log('beforeHook')),
  afterHook: async () => Promise.resolve(() => console.log('afterHook'))
}

describe('APIWrapper: Server', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })
  describe('mergeParams()', () => {
    test('preview mode - true', () => {
      const api = new APIWrapper('123', true, 2500, config)
      expect(api.mergeParams()).toEqual({ auth_token: "123", preview: "1" })
    })

    test('preview mode - false', () => {
      const api = new APIWrapper('123', false, 2500, config)
      expect(api.mergeParams()).toMatchObject({ auth_token: "123", preview: "0" })
    })

    test('custom params', () => {
      const api = new APIWrapper('123', false, 2500, config)
      const customParam = { custom: true }
      expect(api.mergeParams(customParam)).toMatchObject({ auth_token: "123", preview: "0", custom: true })
    })

    describe('custom preview params: will overwrite default preview mode', () => {
      test('default false overwrite to true', () => {
        // test global preview=false setting, overwrite to true using params
        const apiDefaultFalse = new APIWrapper('123', false, 2500, config)
        const customParamPreviewTrue = { preview: true }
        expect(apiDefaultFalse.mergeParams(customParamPreviewTrue)).toMatchObject({ auth_token: "123", preview: "1" })
      })
      test('default true overwrite to false', () => {
        // test global preview=true setting, overwrite to false using params
        const apiDefaultTrue = new APIWrapper('123', true, 2500, config)
        const customParamPreviewFalse = { preview: false }
        expect(apiDefaultTrue.mergeParams(customParamPreviewFalse)).toMatchObject({ auth_token: "123", preview: "0" })
      })
    })
  })

  describe('createUrl()', () => {
    test('builds url without params', () => {
      const api = new APIWrapper('123', false, 2500, config)
      expect(api.createURL('https://example.com', 'some-path')).toEqual('https://example.com/some-path')
    })

    test('builds url with params', () => {
      const api = new APIWrapper('123', false, 2500, config)
      const customParam = { preview: true, something: 'else' }
      expect(api.createURL('https://example.com', 'some-path', customParam)).toEqual('https://example.com/some-path?preview=true&something=else')
    })

    test('builds url ignoring undefined params', () => {
      const api = new APIWrapper('123', false, 2500, config)
      // ignore category undefined ts error
      // @ts-ignore
      const customParam = { preview: true, something: 'else', category: undefined }
      expect(api.createURL('https://example.com', 'some-path', customParam)).toEqual('https://example.com/some-path?preview=true&something=else')
    })

    test('builds url ignoring empty string params', () => {
      const api = new APIWrapper('123', false, 2500, config)
      const customParam = { preview: true, something: 'else', category: '' }
      expect(api.createURL('https://example.com', 'some-path', customParam)).toEqual('https://example.com/some-path?preview=true&something=else')
    })
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
        signal: expect.any(AbortSignal)
      })
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    test('calls hooks', async () => {
      const afterHook = jest.spyOn(config, 'afterHook')
      const beforeHook = jest.spyOn(config, 'beforeHook')

      fetchMock.mockResponse(JSON.stringify({ hello: 'world' }));
  
      const api = new APIWrapper('123', false, 2500, config)
  
      await api.get('test-path', { some: 'param' })
  
      expect(beforeHook).toBeCalledWith('https://api.buttercms.com/v2/test-path?auth_token=123&preview=0&some=param', { some: 'param' })
      expect(afterHook).toBeCalledWith('https://api.buttercms.com/v2/test-path?auth_token=123&preview=0&some=param', { some: 'param' }, { hello: 'world' })

      jest.restoreAllMocks()
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