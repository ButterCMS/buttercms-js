import fetch from '../../lib/utilities/fetch'

import fetchMock from 'jest-fetch-mock'

describe('fetch', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('success', async () => {
    fetchMock.mockResponse(JSON.stringify({ hello: 'butter' }), { status: 200, statusText: 'ok' });

    const response = await fetch('https://example.co.uk', {}, 0)

    expect(fetchMock).toHaveBeenCalledWith('https://example.co.uk', {})
    expect(response).toEqual({ hello: 'butter' })
  })

  test('fail: zero retries: server error', async () => {
    fetchMock.mockResponse('fail', {
      status: 500
    })

    try {
      const response = await fetch('https://example.co.uk', {}, 0)

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(response).toThrowError('Internal Server Error')
    } catch (e) {}
  })

  test('fail: one retry (default retry setting)', async () => {
    fetchMock.mockResponse('fail', {
      status: 500
    })

    try {
      await fetch('https://example.co.uk', {})

      expect(fetchMock).toHaveBeenCalledTimes(2)
    } catch (e) {}
  })
  test('fail: three retries', async () => {
    fetchMock.mockResponse('fail', {
      status: 500
    })

    try {
      await fetch('https://example.co.uk', {}, 3)

      expect(fetchMock).toHaveBeenCalledTimes(4)
    } catch (e) {}
  })
  test('fail: with one retry then success', async () => {
    fetchMock.mockResponses(
      [ 'fail', { status: 500 } ],
      [ JSON.stringify({ hello: 'butter' }), { status: 200 } ]
    )

    const response = await fetch('https://example.co.uk', {}, 2)

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(response).toEqual({ hello: 'butter' })
  })
})