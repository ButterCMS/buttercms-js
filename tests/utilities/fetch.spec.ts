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
    expect(response.ok).toEqual(true)
    expect(response.body).toBeTruthy()
  })
  
  test('fail: zero retries', async () => {
    fetchMock.mockResponse('fail', {
      status: 500
    })

    const response = await fetch('https://example.co.uk', {}, 0)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(response.ok).toEqual(false)
  })
  test('fail: one retry (default retry setting)', async () => {
    fetchMock.mockResponse('fail', {
      status: 500
    })

    await fetch('https://example.co.uk', {})

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
  test('fail: three retries', async () => {
    fetchMock.mockResponse('fail', {
      status: 500
    })

    await fetch('https://example.co.uk', {}, 3)

    expect(fetchMock).toHaveBeenCalledTimes(4)
  })
  test('fail: with one retry then success', async () => {
    fetchMock.mockResponses(
      [ 'fail', { status: 500 } ],
      [ 'success', { status: 200 } ]
    )

    const response = await fetch('https://example.co.uk', {}, 2)

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(response.ok).toBeTruthy()
  })
})